import { createContext } from "react";
import { II18n } from "./types";

export const RootI18nContext = createContext({ i18n: {} as II18n });
