import {
  LucideIcon,
  Ruler,
  DraftingCompass,
  Weight,
  Coins,
  Hourglass,
  FlaskRound,
  Scale,
} from "lucide-react-native";

const Icon = (IconComponent: LucideIcon, color: string) => (
  <IconComponent size={24} color={color} />
);

export const typesOfMeasure = [
  {
    type: "Comprimento",
    units: ["Côvado", "Dedo", "Palmo", "Braça", "Cana", "Jeira"],
    icon: (color: string) => Icon(Ruler, color),
  },
  {
    type: "Distância",
    units: [
      "Estádio",
      "Jornada de um sábado",
      "Jornada de um dia",
      "Milha",
      "Tiro de pedra",
      "Tiro de arco",
    ],
    icon: (color: string) => Icon(DraftingCompass, color),
  },
  {
    type: "Pesos",
    units: [
      "Beca",
      "Gera",
      "Libra romana",
      "Mina ou Arrátel",
      "Siclo",
      "Talento",
    ],
    icon: (color: string) => Icon(Weight, color),
  },
  {
    type: "Dinheiro",
    units: [
      "Asse",
      "Denário",
      "Dracma",
      "Didracma",
      "Estáter",
      "Lepto",
      "Mina",
      "Quadrante",
    ],
    icon: (color: string) => Icon(Coins, color),
  },
  {
    type: "Tempo",
    units: ["Dia", "Noite", "Hora", "Vigília"],
    icon: (color: string) => Icon(Hourglass, color),
  },
  {
    type: "Medidas Secas",
    units: [
      "Alqueire",
      "Cabo",
      "Caliche",
      "Coro",
      "Efa",
      "Gômer",
      "Leteque",
      "Medida",
      "Ômer",
      "Seá",
    ],
    icon: (color: string) => Icon(Scale, color),
  },
  {
    type: "Medidas Líquidas",
    units: [
      "Bato",
      "Cado",
      "Coro",
      "Him",
      "Logue",
      "Metreta",
      "Ômer",
      "Sextário",
    ],
    icon: (color: string) => Icon(FlaskRound, color),
  },
];
