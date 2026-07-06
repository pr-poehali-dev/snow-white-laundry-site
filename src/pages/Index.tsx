import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/3a749f47-e4bb-4bb2-bfdd-eea651eef4ec/files/324a8d97-703d-402a-8f11-d65554d032d1.jpg';

const nav = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Цены', href: '#prices' },
  { label: 'Контакты', href: '#contacts' },
];

const services = [
  { icon: 'Shirt', title: 'Стирка белья', desc: 'Постельное, махровое и повседневное бельё для дома и семьи.' },
  { icon: 'Building2', title: 'Для больниц', desc: 'Дезинфекция и стирка медицинского текстиля по стандартам.' },
  { icon: 'Coffee', title: 'Для кафе и ресторанов', desc: 'Скатерти, салфетки, униформа — всегда белоснежно чистые.' },
  { icon: 'Sparkles', title: 'Глажка и упаковка', desc: 'Профессиональная глажка и аккуратная упаковка каждой вещи.' },
  { icon: 'Truck', title: 'Доставка', desc: 'Заберём грязное и привезём чистое прямо к вашей двери.' },
  { icon: 'Clock', title: 'Срочный заказ', desc: 'Экспресс-стирка за несколько часов, когда нужно быстро.' },
];



export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderComment, setOrderComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderName.trim() || !orderPhone.trim()) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(func2url['submit-order'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: orderName, phone: orderPhone, comment: orderComment }),
      });
      if (!res.ok) throw new Error('Request failed');
      toast({ title: 'Заявка отправлена!', description: 'Мы скоро с вами свяжемся.' });
      setOrderName('');
      setOrderPhone('');
      setOrderComment('');
    } catch {
      toast({ title: 'Не удалось отправить заявку', description: 'Попробуйте ещё раз позже.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-white/80 border-b border-border">
        <div className="container relative flex items-center justify-between h-24">
          <a href="#home" className="absolute top-0 left-2 md:left-8 h-[113px] md:h-[158px] z-10 pointer-events-auto">
            <img
              src="https://cdn.poehali.dev/projects/3a749f47-e4bb-4bb2-bfdd-eea651eef4ec/bucket/1378d90f-2090-4e24-aee5-fddf725ebf9c.png"
              alt="Белоснежка"
              className="h-full w-auto object-contain drop-shadow-xl"
            />
          </a>
          <a href="#home" className="flex items-center gap-3 ml-24 md:ml-32">
            <span className="font-display font-extrabold tracking-tight text-3xl text-cyan-300">"БЕЛОСНЕЖКА"</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex rounded-full">
              <a href="#order">Заказать онлайн</a>
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-secondary-foreground"
              >
                {n.label}
              </a>
            ))}
            <Button asChild className="rounded-full mt-2">
              <a href="#order" onClick={() => setMenuOpen(false)}>Заказать онлайн</a>
            </Button>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-28 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-mesh">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} /> Чисто. Свежо. Вовремя.
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl leading-[1.05] tracking-tight text-secondary-foreground">
              Профессиональная <span className="text-primary">прачечная</span> для вас и вашего бизнеса
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Стираем и гладим бельё для населения, больниц, кафе и организаций.
              Забираем и доставляем — вам остаётся только наслаждаться свежестью.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full text-base px-8">
                <a href="#order">Оформить заказ</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8">
                <a href="#prices">Смотреть цены</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[
                { n: '50+', l: 'клиентов' },
                { n: '24 ч', l: 'срочный заказ' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-extrabold text-2xl text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Свежее чистое бельё"
              className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-square animate-float"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-secondary-foreground">
            Наши услуги
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Полный цикл ухода за текстилем для дома и организаций
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-8 rounded-3xl bg-white border border-border hover:border-primary/40 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <Icon name={s.icon} className="text-primary group-hover:text-white transition-colors" size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-secondary-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 bg-secondary">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-secondary-foreground">
              О прачечной «Белоснежка»
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Мы — команда профессионалов, которой доверяют уже 50+ клиентов.
              Используем современное оборудование, экологичные средства и строго соблюдаем
              санитарные нормы. Работаем с частными клиентами и с организациями.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Экологичные и гипоаллергенные средства',
                'Дезинфекция для медицинских учреждений',
                'Договоры и документы для организаций',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Icon name="CircleCheck" className="text-primary mt-0.5 shrink-0" size={22} />
                  <span className="text-secondary-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'Leaf', t: 'Эко-средства' },
              { icon: 'ShieldCheck', t: 'Гарантия качества' },
              { icon: 'Timer', t: 'Точно в срок' },
              { icon: 'HeartHandshake', t: 'Индивидуальный подход' },
            ].map((c) => (
              <div key={c.t} className="p-6 rounded-3xl bg-white flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                  <Icon name={c.icon} className="text-primary" size={24} />
                </div>
                <span className="font-medium text-secondary-foreground">{c.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="py-20 md:py-28 container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-secondary-foreground">
            Цены
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Прозрачные тарифы без скрытых платежей</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-center font-display font-bold text-lg md:text-xl text-primary mb-4">
            Прейскурант на стирку белья, гардин, тюль и штор
          </h3>
          <table className="w-full border-collapse border-2 border-secondary-foreground text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-2 border-secondary-foreground px-3 py-2 w-14 text-secondary-foreground">№</th>
                <th className="border-2 border-secondary-foreground px-3 py-2 text-left text-secondary-foreground" colSpan={2}>
                  Наименование изделий
                </th>
                <th className="border-2 border-secondary-foreground px-3 py-2 w-32 text-secondary-foreground">Цена</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-medium" rowSpan={2}>1</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 font-medium" rowSpan={2}>Стирка белья:</td>
                <td className="border-2 border-secondary-foreground px-3 py-2">до 4 кг – (независимо от массы сданного белья)</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">900 руб.</td>
              </tr>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2">свыше 4 кг</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">225 руб. за 1 кг</td>
              </tr>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-medium" rowSpan={2}>2</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 font-medium" rowSpan={2}>Стирка белья с добавлением крахмала:</td>
                <td className="border-2 border-secondary-foreground px-3 py-2">до 4 кг – (независимо от массы сданного белья)</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">1200 руб.</td>
              </tr>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2">свыше 4 кг</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">300 руб. за 1 кг</td>
              </tr>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-medium">3</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 font-medium" colSpan={2}>Гардины, тюль, шторы</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">650 руб. за 1 кг</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="max-w-3xl mx-auto mt-14">
          <h3 className="text-center font-display font-bold text-lg md:text-xl text-primary mb-4">
            Прейскурант на услуги прачечной для спецодежды
          </h3>
          <table className="w-full border-collapse border-2 border-secondary-foreground text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-2 border-secondary-foreground px-3 py-2 w-14 text-secondary-foreground">№</th>
                <th className="border-2 border-secondary-foreground px-3 py-2 text-left text-secondary-foreground">Наименование изделий</th>
                <th className="border-2 border-secondary-foreground px-3 py-2 w-32 text-secondary-foreground">Цена(руб)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-medium">1</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 font-medium">Спец. одежда за 1кг (без глажки)</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">300</td>
              </tr>
              <tr>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-medium">1</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 font-medium">Спец. одежда за 1кг (с глажкой)</td>
                <td className="border-2 border-secondary-foreground px-3 py-2 text-center font-bold text-primary">550</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-center font-display font-bold text-secondary-foreground mt-10 text-lg">
          Надбавка за сложность + 30%
        </p>
        <p className="text-center text-muted-foreground mt-2">
          Для организаций действуют специальные условия — уточняйте при заказе.
        </p>
      </section>

      {/* Order + Contacts */}
      <section id="order" className="py-20 md:py-28 container">
        <div className="grid lg:grid-cols-2 gap-12">
          <div id="contacts">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-secondary-foreground">
              Заказ онлайн
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Оставьте заявку — перезвоним, уточним детали и заберём бельё.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { icon: 'Phone', t: '+7 (959) 136-80-53' },
                { icon: 'Mail', t: 'irinka-0909@mail.ru' },
                { icon: 'MapPin', t: 'ЛНР, м.о. Антрацитовский, г.Антрацит, ул.Смиронова, д. 15 А' },
                { icon: 'Clock', t: 'С понедельника по пятницу с 8:00 до 16:00' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                    <Icon name={c.icon} className="text-primary" size={20} />
                  </div>
                  <span className="text-secondary-foreground font-medium">{c.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl overflow-hidden border border-border">
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=Луганская%20Народная%20Республика%2C%20Антрацитовский%20район%2C%20Антрацит%2C%20улица%20Смирнова%2C%2015%D0%90"
                width="100%"
                height="280"
                frameBorder="0"
                title="Схема проезда"
                className="w-full"
              />
            </div>
          </div>

          <form
            className="p-8 rounded-3xl bg-secondary border border-border space-y-4"
            onSubmit={handleOrderSubmit}
          >
            <div>
              <label className="text-sm font-medium text-secondary-foreground mb-1.5 block">Ваше имя</label>
              <Input
                placeholder="Как к вам обращаться?"
                className="rounded-xl bg-white h-12"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-foreground mb-1.5 block">Телефон</label>
              <Input
                placeholder="+7 (___) ___-__-__"
                className="rounded-xl bg-white h-12"
                value={orderPhone}
                onChange={(e) => setOrderPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-foreground mb-1.5 block">Комментарий</label>
              <Textarea
                placeholder="Что нужно постирать и когда забрать?"
                className="rounded-xl bg-white min-h-28"
                value={orderComment}
                onChange={(e) => setOrderComment(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-xl text-base" disabled={submitting}>
              {submitting ? 'Отправляем...' : 'Отправить заявку'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Snowflake" className="text-white" size={18} />
            </div>
            <span className="font-display font-extrabold text-secondary-foreground">Белоснежка</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Прачечная «Белоснежка». Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}