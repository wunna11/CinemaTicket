import { StyleSheet } from "react-native";
import { WHITE } from "../../../utils/styles/color";

const OptStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  btnBox: {
    width: "80%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textBoxes: {
    backgroundColor: WHITE,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 9,
    marginTop: 10,
    marginBottom: 10,
  },
  recap: {
    width: 320,
  },
});

export { OptStyle };
