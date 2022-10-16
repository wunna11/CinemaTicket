import { StyleSheet } from "react-native";
import {
  GRAY,
  GRAY100,
  GRAY200,
  GRAY300,
  GRAY400,
  GRAY500,
  PRIMARY,
  SECONDARY,
  WHITE,
  windowWidth,
} from "../../../utils/styles/color";

const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerComponent: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: PRIMARY,
  },
  userInfoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avaterImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: "500",
    color: SECONDARY,
    marginTop: 10,
  },

  // List
  listContainer: {
    paddingHorizontal: 20,
  },
  listBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomColor: GRAY100,
    borderBottomWidth: 1,
  },
  listBoxLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  listBoxText: {
    color: SECONDARY,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
  },
  listBoxChevron: {
    alignSelf: "flex-end",
    alignContent: "flex-end",
  },
});

export { ProfileStyle };
