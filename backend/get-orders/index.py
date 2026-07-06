import json
import os
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    '''Возвращает список заявок из базы данных при наличии верного пароля администратора'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body_data = json.loads(event.get('body') or '{}')
    password = body_data.get('password') or ''

    admin_password = os.environ.get('ADMIN_PANEL_PASSWORD', '')

    if not admin_password or password != admin_password:
        return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Неверный пароль'})}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            "SELECT id, name, phone, comment, ip_address, user_agent, os_info, "
            "TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at "
            "FROM orders ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
    finally:
        conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'orders': rows}, default=str)
    }
