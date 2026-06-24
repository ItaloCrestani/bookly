import { CiBookmark } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export type BookStatus = | "wantToRead" | "Readed" | "Reading"

export type OptionProps = {
  value: BookStatus;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  hover: string;
}

type currentStatusProps = {
  value: BookStatus;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export const statusOptions: OptionProps[] = [
  {
    value: "wantToRead",
    title: "Quero ler",
    icon: <CiBookmark className="size-5 md:size-7.5" color="var(--text-read)" />,
    color: "--text-read",
    bg: "--bg-read",
    border: "--border-read",
    hover: "--hover-read",
    subtitle: "Adicionar à sua lista de desejos"
  },
  {
    value: "Reading",
    title: "Estou lendo",
    icon: <HiOutlineBookOpen className="size-5 md:size-7.5" color="var(--text-reading)" />,
    color: "--text-reading",
    bg: "--bg-reading",
    border: "--border-reading",
    hover: "--hover-reading",
    subtitle: "Acompanhar sua leitura"
  },
  {
    value: "Readed",
    title: "Já li",
    icon: <IoIosCheckmarkCircleOutline className="size-5 md:size-7.5" color="var(--text-readed)" />,
    color: "--text-readed",
    bg: "--bg-readed",
    border: "--border-readed",
    hover: "--hover-readed",
    subtitle: "Marcar como concluído"
  }
];

export const currentStatus: currentStatusProps[] = [
  {
    value: "Reading",
    title: "Estou lendo",
    subtitle: "Iniciado em",
    icon: <HiOutlineBookOpen size={25} color="var(--text-reading)" />,
    color: "--text-reading",
  },
  {
    value: "wantToRead",
    title: "Quero ler",
    subtitle: "Salvo em",
    icon: <CiBookmark size={25} color="var(--text-read)" />,
    color: "--text-read",
  },
  {
    value: "Readed",
    title: "Já li",
    subtitle: "Concluído em",
    icon: <IoIosCheckmarkCircleOutline size={25} color="var(--text-readed)" />,
    color: "--text-readed",
  }
]
