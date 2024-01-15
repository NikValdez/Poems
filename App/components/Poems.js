import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Button, FlatList } from "react-native"
import { supabase } from "../utils/supabase"
import { Input } from "@rneui/themed"

export default function Poems() {
  const [poem, setPoem] = useState("")
  const [poems, setPoems] = useState([])

  useEffect(() => {
    fetchPoems()
  }, [])

  const fetchPoems = async () => {
    const { data } = await supabase.from("poems").select("*")
    setPoems(data)
  }

  const handleAddPoem = async () => {
    if (poem.length > 0) {
      await supabase
        .from("poems")
        .insert([	{
          text: poem
        },])
        .single()

      setPoem("")
    }
  }


  return (
    <View style={{flex: 1, marginTop: 50 }}>
      <Input value={poem} placeholder="Create Poem" onChangeText={setPoem}  style={{alignSelf: 'stretch'}}  />
      <Button title="Add Poem" onPress={handleAddPoem} />
      <FlatList
        data={poems}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}
