import type { LucideIcon } from "lucide-react";
import { Brain, Zap, Code2, Gauge, Shield, Users, Sparkles, Clock } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Stat = { value: string; label: string };

export type Service = {
  title: string;
  description: string;
  features: string[];
  price: string;
  highlighted?: boolean;
};

export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number; // 1..5
};

export type HeroBadge = { icon: LucideIcon; label: string };
export const heroBadges: HeroBadge[] = [
  { icon: Sparkles, label: "ИИ" },
  { icon: Zap, label: "Без кода" },
  { icon: Shield, label: "Самостоятельный хостинг" },
];

export type TrustIndicator = { icon: LucideIcon; label: string };
export const trustIndicators: TrustIndicator[] = [
  { icon: Clock, label: "Внедрение за 2-4 недели" },
  { icon: Shield, label: "100% безопасность данных" },
  { icon: Zap, label: "ROI от 300%" },
];

export const features: Feature[] = [
  {
    icon: Brain,
    title: "ИИ-агенты",
    description: "LLM-агенты принимают решения и анализируют данные в реальном времени",
  },
  {
    icon: Zap,
    title: "Быстрое внедрение",
    description: "Запуск первых автоматизаций через 2-4 недели",
  },
  {
    icon: Code2,
    title: "No-code платформа",
    description: "Визуальный редактор workflow без необходимости программирования",
  },
  {
    icon: Gauge,
    title: "Высокая производительность",
    description: "Обработка тысяч задач в час без задержек",
  },
  {
    icon: Shield,
    title: "Полный контроль",
    description: "Self-hosted решение на ваших серверах для максимальной безопасности",
  },
  {
    icon: Users,
    title: "Поддержка 24/7",
    description: "Полное сопровождение и обучение вашей команды",
  },
];

export const stats: Stat[] = [
  { value: "120+", label: "часов экономии в месяц" },
  { value: "300%", label: "ROI от внедрения" },
  { value: "60%", label: "меньше ошибок" },
  { value: "2-4", label: "недели на запуск" },
];

export const services: Service[] = [
  {
    title: "Внедрение n8n",
    description: "Полный цикл развертывания и настройки платформы",
    features: ["Установка и настройка", "Интеграции с API", "Обучение команды"],
    price: "от 150 000 ₽",
    highlighted: false,
  },
  {
    title: "Разработка workflow",
    description: "Создание автоматизаций под ваши задачи",
    features: ["Анализ процессов", "Проектирование", "Тестирование"],
    price: "от 50 000 ₽",
    highlighted: true,
  },
  {
    title: "Консалтинг",
    description: "Помогаю выбрать лучшие решения для автоматизации",
    features: ["Аудит текущих процессов", "План внедрения", "Оценка ROI"],
    price: "15 000 ₽/час",
    highlighted: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Алексей Петров",
    role: "CTO, TechStartup",
    content:
      "Внедрение n8n сократило время обработки заявок с 4 часов до 15 минут. Полная автоматизация воронки продаж.",
    rating: 5,
  },
  {
    name: "Мария Иванова",
    role: "Основатель, EduPlatform",
    content:
      "ИИ-агенты теперь отвечают на 80% вопросов студентов. Наша поддержка стала мгновенной, а NPS вырос на 40%.",
    rating: 5,
  },
  {
    name: "Дмитрий Сидоров",
    role: "CEO, MarketingAgency",
    content:
      "Автоматизировали всю отчетность и аналитику. То, что раньше занимало 2 дня, теперь готово за 2 часа.",
    rating: 5,
  },
];

