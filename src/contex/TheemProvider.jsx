import { createContext, useContext, useEffect, useState } from "react";
import authService from "../app/authService";
import profileDatabas from "../app/profileDatabas";
import databasesService from "../app/databasesService";
import settingDatabas from "../app/settingDatabas";
import iconeDatabas from "../app/iconeDatabas";

export const ThemeContext = createContext();
const TheemProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [categoryId, setCategoryId] = useState([]);
   const [logo, setLogo] = useState([]);
   const [icone, setIcone] = useState([]);
  const fatch = async () => {
    const userData = await authService.getAccount();
    let profileData = await profileDatabas.listQuery(userData.$id);
    setImageId(profileData?.documents[0]?.imageId ?? null);

    setAuthInfo(userData);
  };

  const categoryFatch = async () => {
    const loaded = await databasesService.allarticles();
    // let ReduceDublicate = [];

    // loaded.documents.forEach((data) => {
    //   if (data.category in ReduceDublicate) {
    //     ReduceDublicate[data.category] =
    //       ReduceDublicate[data.category] + 1;
    //   } else {
    //     ReduceDublicate[data.category] = 1;
    //   }
    // });

    // let store=[];

    const ReduceDublicate = loaded.documents.reduce((store, data) => {
      store[data.category] = (store[data.category] || 0) + 1;
      return store;
    }, {});
    setCategoryId(Object.entries(ReduceDublicate));
  };
  useEffect(() => {
    const fotter = async () => {
      const data = await settingDatabas.settingQuery ();
      setLogo(data);
    };
    fotter();
  }, []);
    useEffect(() => {
    const featch = async () => {
      const data = await iconeDatabas.iconeQuery ();  
      setIcone(data);
    };
    featch();
  }, []);
  useEffect(() => {
    const getData = localStorage.getItem("authUser");
    if (getData) {
      setAuth(true);
    }
    fatch();
    categoryFatch();
  }, []);
  let dataList = {
    setAuth,
    isAuth,
    authInfo,
    fatch,
    setImageId,
    imageId,
    categoryId,
    logo,
    icone,
  };
  return <ThemeContext value={dataList}>{children}</ThemeContext>;
};
export default TheemProvider;

// export const ThemeProvider = ThemeContext.Provider

export function useTheme() {
  return useContext(ThemeContext);
}
