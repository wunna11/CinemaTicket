import { StyleSheet } from "react-native";
import { WHITE, GRAY, GRAY100, PRIMARY, SECONDARY } from "../../../utils/styles/color";

const EditProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  formContainer: {
    width: "90%",
    backgroundColor: GRAY100,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  btnBox: {
    width: "100%",
    marginTop:10,
  },
  titleText: {
    color: GRAY,
    fontSize: 18,
    fontWeight: "500",
    marginBottom:20,
  },
});

export { EditProfileStyle };
