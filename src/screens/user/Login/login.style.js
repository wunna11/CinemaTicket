import { StyleSheet } from "react-native";
import {
  WHITE,
  GRAY,
  PRIMARY,
  SECONDARY,
  GRAY100,
  windowWidth,
} from "../../../utils/styles/color";

const LoginStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  logoText: {
    width: 100,
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },

  // Form
  formContainer: {
    width: windowWidth * 0.9,
    padding: 20,
    backgroundColor: GRAY100,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  titleText: {
    color: PRIMARY,
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 30,
  },
  btnBox: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  registerBtnBox: {
    marginTop: 20,
  },
});

export { LoginStyle };
