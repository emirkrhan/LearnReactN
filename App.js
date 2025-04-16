import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App () {
  const [completedSections, setCompletedSections] = useState([])

  const handleComplete = id => {
    if (!completedSections.includes(id)) {
      setCompletedSections([...completedSections, id])
    } else {
      const newCompletedSections = completedSections.filter(item => item < id)
      setCompletedSections(newCompletedSections)
    }
  }

  const isCompleted = id => completedSections.includes(id)

  const sections = [
    {
      id: 1,
      title: 'Expo CLI ile Başlangıç Projesi Kur',
      code: `npm install -g expo-cli\nnpx create-expo-app my-first-app\ncd my-first-app\nnpm start`,
      description: 'Expo Go ile telefonundan QR kodu okut, canlı çalışmayı gör!'
    },
    {
      id: 2,
      title: 'Temel Yapıyı Anla',
      code: `import { View, Text } from 'react-native';\n\nexport default function App() {\n  return (\n    <View>\n      <Text>Hello React Native!</Text>\n    </View>\n  );\n}`,
      description:
        'View ve Text bileşenlerini kullanarak ilk bileşenlerini oluştur!'
    },
    {
      id: 3,
      title: 'Temel Yapıyı Anla',
      code: `import { View, Text } from 'react-native';\n\nexport default function App() {\n  return (\n    <View>\n      <Text>Hello React Native!</Text>\n    </View>\n  );\n}`,
      description:
        'View ve Text bileşenlerini kullanarak ilk bileşenlerini oluştur!'
    },
    {
      id: 4,
      title: 'Temel Yapıyı Anla',
      code: `import { View, Text } from 'react-native';\n\nexport default function App() {\n  return (\n    <View>\n      <Text>Hello React Native!</Text>\n    </View>\n  );\n}`,
      description:
        'View ve Text bileşenlerini kullanarak ilk bileşenlerini oluştur!'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
       
        <Text style={styles.menuText}>Learn React Native</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {sections.map(section => (
          <View
            key={section.id}
            style={[
              styles.educateSection,
              isCompleted(section.id) && styles.completedSection
            ]}
          >
            <Text style={styles.sectionTitleText}>{section.title}</Text>
            <Text style={styles.sectionCodeText}>{section.code}</Text>
            <Text style={styles.sectionDescriptionText}>
              {section.description}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleComplete(section.id)}
              >
                <Icon
                  name='check'
                  size={20}
                  color='#000'
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name='home' size={24} color='#4d4d4d' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name='user' size={24} color='#4d4d4d' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  menuBar: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'start'
  },
  menuText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  scrollViewContent: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  educateSection: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center'
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  sectionCodeText: {
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: '#eaeaea',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  sectionDescriptionText: {
    fontSize: 14,
    color: '#333'
  },
  completedSection: {
    backgroundColor: '#b6e3b6'
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  menuItem: {
    alignItems: 'center'
  }
})
