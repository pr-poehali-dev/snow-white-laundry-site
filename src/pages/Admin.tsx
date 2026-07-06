import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

interface Order {
  id: number;
  name: string;
  phone: string;
  comment: string;
  ip_address: string;
  user_agent: string;
  os_info: string;
  created_at: string;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(func2url['get-orders'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.status === 401) {
        toast({ title: 'Неверный пароль', variant: 'destructive' });
        return;
      }
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setOrders(data.orders || []);
      setAuthorized(true);
    } catch {
      toast({ title: 'Не удалось загрузить заявки', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm p-8 rounded-3xl bg-white border border-border space-y-4">
          <div className="flex items-center gap-2 justify-center mb-2">
            <Icon name="Lock" className="text-primary" size={24} />
            <h1 className="font-display font-bold text-xl text-secondary-foreground">Вход в заявки</h1>
          </div>
          <Input
            type="password"
            placeholder="Пароль"
            className="rounded-xl h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full rounded-xl h-12" disabled={loading}>
            {loading ? 'Проверяем...' : 'Войти'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-secondary-foreground">
            Заявки ({orders.length})
          </h1>
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← На главную
          </a>
        </div>

        {orders.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">Заявок пока нет</p>
        ) : (
          <div className="rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Комментарий</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>ОС</TableHead>
                  <TableHead>Браузер</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="whitespace-nowrap">{o.created_at}</TableCell>
                    <TableCell className="font-medium">{o.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{o.phone}</TableCell>
                    <TableCell className="max-w-xs">{o.comment || '—'}</TableCell>
                    <TableCell className="whitespace-nowrap">{o.ip_address}</TableCell>
                    <TableCell className="whitespace-nowrap">{o.os_info}</TableCell>
                    <TableCell className="max-w-xs text-xs text-muted-foreground truncate" title={o.user_agent}>
                      {o.user_agent}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
