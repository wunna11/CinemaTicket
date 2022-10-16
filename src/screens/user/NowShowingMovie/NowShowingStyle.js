import { StyleSheet, Dimensions } from "react-native";
import { WHITE, GRAY, SECONDARY } from "../../../utils/styles/color";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const RATIO_ANIMATION = width * 0.7;

const MovieListStyle = StyleSheet.create({
  //casual style
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Button: {
    margin: 10,
  },
  iconS: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  casualContentContainer: {
    flex: 1,
    backgroundColor: "#000",
    height: 700,
    paddingHorizontal: 14,
  },
  searchBoxContainer: {
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 4,
    marginVertical: 10,
    width: "95%",
    flexDirection: "row",
    alignSelf: "center",
  },
  SearchBox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },

  iimage1: {
    width: 50,
    height: 80,
    borderRadius: 10,
  },
  posterImage: {
    width: "100%",
    height: RATIO_ANIMATION * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    margin: 20,
    color: "#fff",
    marginBottom: 0,
  },
  nowshowing: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 40,
    marginBottom: 0,
    color: "#fff",
  },
  upcoming: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 0,
  },
  poster: {
    margin: 10,
    width: 175,
    height: 300,
  },
  movieCat: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    marginLeft: 140,
    marginTop: 7,
  },
  bottom: {
    width: 75,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imgLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  Bot1: {
    fontSize: 13,
    color: "black",
    padding: 5,
    fontWeight: "bold",
    paddingBottom: 0,
    textAlign: "center",
  },
  headerComponent: {
    height: 60,
  },
  footerComponent: {
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: GRAY,
    fontSize: 16,
    fontWeight: "700",
  },
  headerBtn: {
    width: 100,
  },
  searchSyl: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export { MovieListStyle };
