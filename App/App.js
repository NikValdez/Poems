import { ThemeProvider, Button, createTheme } from "@rneui/themed"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import Poems from "./components/Poems"

const theme = createTheme({
  components: {
    Button: {
      titleStyle: {
        color: "red",
      },
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Poems />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
