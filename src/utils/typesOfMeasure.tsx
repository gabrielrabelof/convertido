import {
  LucideIcon,
  Ruler,
  DraftingCompass,
  Weight,
  Coins,
  Hourglass,
  LandPlot,
  FlaskRound,
  Scale,
} from "lucide-react-native";

const Icon = (IconComponent: LucideIcon, color: string) => (
  <IconComponent size={24} color={color} />
);

export const typesOfMeasure = [
  {
    type: "Comprimento",
    units: ["Braça", "Cana", "Côvado", "Dedo", "Palmo"],
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
    units: ["Beca", "Gera", "Libra romana", "Arrátel", "Siclo", "Talento"],
    icon: (color: string) => Icon(Weight, color),
  },
  {
    type: "Dinheiro",
    units: [
      "Asse",
      "Denário",
      "Dracma",
      "Didracma",
      "Tetradracma",
      "Estáter",
      "Lepto",
      "Mina",
      "Quadrante",
    ],
    icon: (color: string) => Icon(Coins, color),
  },
  {
    type: "Tempo",
    units: ["Dia", "Noite", "Horas", "Vigília"],
    icon: (color: string) => Icon(Hourglass, color),
  },
  {
    type: "Área",
    units: ["Jeira"],
    icon: (color: string) => Icon(LandPlot, color),
  },
  {
    type: "Medidas Secas",
    units: ["Cabo", "Coro Seco", "Efa", "Gômer", "Ômer", "Seá"],
    icon: (color: string) => Icon(Scale, color),
  },
  {
    type: "Medidas Líquidas",
    units: [
      "Bato",
      "Cado",
      "Coro Líquido",
      "Him",
      "Logue",
      "Metreta",
      "Sextário",
    ],
    icon: (color: string) => Icon(FlaskRound, color),
  },
];
