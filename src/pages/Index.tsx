import { useState } from 'react';
import Icon from '@/components/ui/icon';
import WhiteBgImage from '@/components/WhiteBgImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/3a749f47-e4bb-4bb2-bfdd-eea651eef4ec/files/324a8d97-703d-402a-8f11-d65554d032d1.jpg';

const nav = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Цены', href: '#prices' },
  { label: 'Отзывы', href: '#reviews' },
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

const prices = [
  { name: 'Постельное бельё (комплект)', price: '350 ₽' },
  { name: 'Стирка белья, 1 кг', price: '120 ₽' },
  { name: 'Скатерти и салфетки, 1 кг', price: '190 ₽' },
  { name: 'Медицинский текстиль, 1 кг', price: '160 ₽' },
  { name: 'Глажка, 1 кг', price: '90 ₽' },
  { name: 'Доставка по городу', price: 'от 200 ₽' },
];

const reviews = [
  { name: 'Мария Л.', role: 'Постоянный клиент', text: 'Бельё возвращают идеально чистым и приятно пахнущим. Доставка всегда вовремя!' },
  { name: 'Кафе «Уют»', role: 'Партнёр', text: 'Работаем уже год — скатерти и униформа безупречны. Рекомендуем как надёжного партнёра.' },
  { name: 'Городская больница №3', role: 'Организация', text: 'Соблюдают все санитарные нормы, объёмы обрабатывают быстро. Спасибо за качество!' },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-white/80 border-b border-border">
        <div className="container relative flex items-center justify-between h-24">
          <a href="#home" className="absolute top-0 left-2 md:left-8 h-[150px] md:h-[210px] z-10 pointer-events-auto">
            <WhiteBgImage
              src="https://cdn.poehali.dev/projects/3a749f47-e4bb-4bb2-bfdd-eea651eef4ec/bucket/deea3ea2-f5a5-42fb-ad53-5cba9ea73273.jpg"
              alt="Белоснежка"
              className="h-full w-auto object-contain drop-shadow-xl"
            />
          </a>
          <a href="#home" className="flex items-center gap-3 ml-24 md:ml-32">
            <span className="font-display font-extrabold text-xl tracking-tight text-secondary-foreground">
              Белоснежка
            </span>
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
                { n: '8 лет', l: 'на рынке' },
                { n: '500+', l: 'клиентов' },
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
              Мы — команда профессионалов, которая уже 8 лет заботится о чистоте.
              Используем современное оборудование, экологичные средства и строго соблюдаем
              санитарные нормы. Работаем с частными клиентами и с организациями.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Экологичные и гипоаллергенные средства',
                'Дезинфекция для медицинских учреждений',
                'Договоры и документы для организаций',
                'Бесплатная доставка при заказе от 3000 ₽',
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
        <div className="max-w-2xl mx-auto rounded-3xl border border-border overflow-hidden bg-white">
          {prices.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center justify-between px-6 md:px-8 py-5 ${
                i !== prices.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-secondary-foreground font-medium">{p.name}</span>
              <span className="font-display font-bold text-primary text-lg">{p.price}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-6">
          Для организаций действуют специальные условия — уточняйте при заказе.
        </p>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-secondary-foreground">
              Отзывы
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">Нам доверяют семьи и компании</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="p-8 rounded-3xl bg-white border border-border">
                <div className="flex gap-1 mb-4 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-secondary-foreground mb-6">«{r.text}»</p>
                <div>
                  <div className="font-display font-bold text-secondary-foreground">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                { icon: 'Phone', t: '+7 (900) 000-00-00' },
                { icon: 'Mail', t: 'hello@белоснежка.рус' },
                { icon: 'MapPin', t: 'г. Москва, ул. Чистая, 1' },
                { icon: 'Clock', t: 'Ежедневно 8:00 — 21:00' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                    <Icon name={c.icon} className="text-primary" size={20} />
                  </div>
                  <span className="text-secondary-foreground font-medium">{c.t}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            className="p-8 rounded-3xl bg-secondary border border-border space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm font-medium text-secondary-foreground mb-1.5 block">Ваше имя</label>
              <Input placeholder="Как к вам обращаться?" className="rounded-xl bg-white h-12" />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-foreground mb-1.5 block">Телефон</label>
              <Input placeholder="+7 (___) ___-__-__" className="rounded-xl bg-white h-12" />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-foreground mb-1.5 block">Комментарий</label>
              <Textarea placeholder="Что нужно постирать и когда забрать?" className="rounded-xl bg-white min-h-28" />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-xl text-base">
              Отправить заявку
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