import json
import os
import re
import psycopg2


def parse_os(user_agent: str) -> str:
    '''Определяет версию операционной системы по строке User-Agent'''
    if not user_agent:
        return 'Unknown'
    ua = user_agent
    patterns = [
        (r'Windows NT 10\.0', 'Windows 10/11'),
        (r'Windows NT 6\.3', 'Windows 8.1'),
        (r'Windows NT 6\.2', 'Windows 8'),
        (r'Windows NT 6\.1', 'Windows 7'),
        (r'Mac OS X (\d+[_.]\d+[_.]?\d*)', None),
        (r'Android (\d+[.\d]*)', None),
        (r'iPhone OS (\d+[_.]\d+)', None),
        (r'iPad; CPU OS (\d+[_.]\d+)', None),
        (r'Linux', 'Linux'),
    ]
    mac = re.search(r'Mac OS X (\d+[_.]\d+[_.]?\d*)', ua)
    if mac:
        return f"macOS {mac.group(1).replace('_', '.')}"
    android = re.search(r'Android (\d+[.\d]*)', ua)
    if android:
        return f"Android {android.group(1)}"
    ios = re.search(r'(?:iPhone OS|CPU OS) (\d+[_.]\d+)', ua)
    if ios:
        return f"iOS {ios.group(1).replace('_', '.')}"
    win = re.search(r'Windows NT (\d+\.\d+)', ua)
    if win:
        versions = {
            '10.0': 'Windows 10/11',
            '6.3': 'Windows 8.1',
            '6.2': 'Windows 8',
            '6.1': 'Windows 7',
        }
        return versions.get(win.group(1), f'Windows NT {win.group(1)}')
    if 'Linux' in ua:
        return 'Linux'
    return 'Unknown'


def handler(event: dict, context) -> dict:
    '''Принимает заявку с формы сайта и сохраняет её в базу данных вместе с IP, user-agent и ОС клиента'''
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
    name = (body_data.get('name') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    comment = (body_data.get('comment') or '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите имя и телефон'})}

    req_headers = event.get('headers') or {}
    request_context = event.get('requestContext') or {}
    identity = request_context.get('identity') or {}

    ip_address = identity.get('sourceIp') or req_headers.get('X-Forwarded-For') or req_headers.get('x-forwarded-for') or 'unknown'
    user_agent = req_headers.get('User-Agent') or req_headers.get('user-agent') or ''
    os_info = parse_os(user_agent)

    name_escaped = name.replace("'", "''")
    phone_escaped = phone.replace("'", "''")
    comment_escaped = comment.replace("'", "''")
    ip_escaped = str(ip_address).replace("'", "''")
    ua_escaped = user_agent.replace("'", "''")
    os_escaped = os_info.replace("'", "''")

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO orders (name, phone, comment, ip_address, user_agent, os_info) "
            f"VALUES ('{name_escaped}', '{phone_escaped}', '{comment_escaped}', '{ip_escaped}', '{ua_escaped}', '{os_escaped}') "
            f"RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
    finally:
        conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'id': new_id})
    }
