import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

// Ekran genişliğini al
const { width } = Dimensions.get('window');

// Profil sayfası bileşeni
const ProfileScreen = ({ completedSections, totalSections }) => {
  const progress = Math.round((completedSections.length / totalSections) * 100) || 0;

  return (
    <ScrollView
      style={styles.profileScrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.profileScrollViewContent}
    >
      <LinearGradient
        colors={['#6a40f6', '#8e6af9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHeader}
      >
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageBorder}>
            <Icon name="user-astronaut" size={50} color="#FFF" />
          </View>
        </View>
        <Text style={styles.profileName}>React Öğrencisi</Text>
        <Text style={styles.profileBio}>React Native ile mobil uygulama geliştirmeyi öğreniyorum</Text>

        <View style={styles.profileStatsContainer}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{totalSections}</Text>
            <Text style={styles.profileStatLabel}>Toplam Ders</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{completedSections.length}</Text>
            <Text style={styles.profileStatLabel}>Tamamlanan</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{progress}%</Text>
            <Text style={styles.profileStatLabel}>İlerleme</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.profileContent}>
        <View style={styles.profileSection}>
          <View style={styles.profileSectionHeader}>
            <Icon name="trophy" size={20} color="#6a40f6" />
            <Text style={styles.profileSectionTitle}>Başarılarım</Text>
          </View>

          <View style={styles.achievementsContainer}>
            <View style={[styles.achievementItem, { opacity: progress >= 20 ? 1 : 0.4 }]}>
              <View style={[styles.achievementIcon, { backgroundColor: progress >= 20 ? '#6a40f6' : '#e0e0e0' }]}>
                <Icon name="star" size={20} color="#FFF" solid={progress >= 20} />
              </View>
              <Text style={styles.achievementTitle}>Başlangıç</Text>
              <Text style={styles.achievementDesc}>İlk dersi tamamla</Text>
            </View>

            <View style={[styles.achievementItem, { opacity: progress >= 50 ? 1 : 0.4 }]}>
              <View style={[styles.achievementIcon, { backgroundColor: progress >= 50 ? '#6a40f6' : '#e0e0e0' }]}>
                <Icon name="code" size={20} color="#FFF" solid={progress >= 50} />
              </View>
              <Text style={styles.achievementTitle}>Geliştirici</Text>
              <Text style={styles.achievementDesc}>%50 ilerleme</Text>
            </View>

            <View style={[styles.achievementItem, { opacity: progress >= 100 ? 1 : 0.4 }]}>
              <View style={[styles.achievementIcon, { backgroundColor: progress >= 100 ? '#6a40f6' : '#e0e0e0' }]}>
                <Icon name="graduation-cap" size={20} color="#FFF" solid={progress >= 100} />
              </View>
              <Text style={styles.achievementTitle}>Uzman</Text>
              <Text style={styles.achievementDesc}>Tüm dersleri bitir</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileSectionHeader}>
            <Icon name="chart-line" size={20} color="#6a40f6" />
            <Text style={styles.profileSectionTitle}>İlerleme Durumum</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: '#6a40f6' }]}
              />
            </View>
            <Text style={styles.progressText}>{progress}% Tamamlandı</Text>
          </View>

          <View style={styles.nextLessonContainer}>
            <Text style={styles.nextLessonTitle}>Bir Sonraki Dersin:</Text>
            {completedSections.length < totalSections ? (
              <View style={styles.nextLessonCard}>
                <View style={styles.nextLessonIconContainer}>
                  <Icon name="book-reader" size={24} color="#FFF" />
                </View>
                <View style={styles.nextLessonInfo}>
                  <Text style={styles.nextLessonName}>
                    {completedSections.length + 1}. Ders
                  </Text>
                  <TouchableOpacity style={styles.nextLessonButton}>
                    <Text style={styles.nextLessonButtonText}>Derse Git</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.allCompletedContainer}>
                <Icon name="check-circle" size={30} color="#6a40f6" solid />
                <Text style={styles.allCompletedText}>Tüm dersleri tamamladın!</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Ana sayfa bileşeni
const HomeScreen = ({ sections, completedSections, handleComplete, isCompleted }) => {
  // Açık olan kartları takip etmek için state - ilk dersi varsayılan olarak aç
  const [expandedSections, setExpandedSections] = useState([1]);

  // Kartı açıp kapatma fonksiyonu
  const toggleSection = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  // Kartın açık olup olmadığını kontrol etme
  const isSectionExpanded = (sectionId) => {
    return expandedSections.includes(sectionId);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeHeader}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>React Native'i Keşfet</Text>
            <Text style={styles.welcomeSubtitle}>Mobil uygulama geliştirmeyi adım adım öğren</Text>
          </View>
          <View style={styles.welcomeImageContainer}>
            <LinearGradient
              colors={['#6a40f6', '#8e6af9']}
              style={styles.imageBackground}
            >
              <Icon name="react" size={40} color="#FFF" />
            </LinearGradient>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{sections.length}</Text>
            <Text style={styles.statLabel}>Ders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedSections.length}</Text>
            <Text style={styles.statLabel}>Tamamlanan</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{Math.round((completedSections.length / sections.length) * 100) || 0}%</Text>
            <Text style={styles.statLabel}>İlerleme</Text>
          </View>
        </View>
      </View>

      {sections.map(section => (
        <View
          key={section.id}
          style={[
            styles.educateSection,
            isCompleted(section.id) && styles.completedSection
          ]}
        >
          {/* Kart Başlığı - Tıklanabilir */}
          <TouchableOpacity
            style={[
              styles.sectionHeaderContainer,
              isSectionExpanded(section.id) && { borderBottomWidth: 1 }
            ]}
            onPress={() => toggleSection(section.id)}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionNumberContainer,
                  { backgroundColor: isCompleted(section.id) ? '#8e6af9' : '#6a40f6' }
                ]}
              >
                <Text style={styles.sectionNumber}>{section.id}</Text>
              </View>
              <Text style={styles.sectionTitleText}>{section.title}</Text>
            </View>

            {/* Açılıp Kapanma İkonu */}
            <Icon
              name={isSectionExpanded(section.id) ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#6a40f6"
            />
          </TouchableOpacity>

          {/* İçerik - Açıksa Göster */}
          {isSectionExpanded(section.id) && (
            <View style={styles.lessonContentContainer}>
              {/* Açıklama Bölümü */}
              <Text style={styles.sectionSubtitle}>Açıklama</Text>
              <Text style={styles.lessonInfoText}>{section.info}</Text>

              {/* Kod Bölümü */}
              <Text style={styles.sectionSubtitle}>Kod Örneği</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.sectionCodeText}>{section.code}</Text>
              </View>

              {/* İpucu Bölümü */}
              <Text style={styles.sectionSubtitle}>İpucu</Text>
              <View style={styles.tipContainer}>
                <Text style={styles.tipText}>{section.tip}</Text>
              </View>

              {/* Tamamla Butonu */}
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  isCompleted(section.id) && styles.completedButton
                ]}
                onPress={() => handleComplete(section.id)}
              >
                <Icon
                  name={isCompleted(section.id) ? 'check-circle' : 'circle'}
                  size={20}
                  color={isCompleted(section.id) ? '#6a40f6' : '#B8B8B8'}
                  solid={isCompleted(section.id)}
                />
                <Text style={[
                  styles.completeButtonText,
                  isCompleted(section.id) && styles.completedButtonText
                ]}>
                  {isCompleted(section.id) ? 'Tamamlandı' : 'Tamamla'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tamamlandı İşareti - Kapalıyken Göster */}
          {!isSectionExpanded(section.id) && isCompleted(section.id) && (
            <View style={styles.collapsedCompletedIndicator}>
              <Icon
                name="check-circle"
                size={16}
                color="#6a40f6"
                solid
              />
              <Text style={styles.collapsedCompletedText}>Tamamlandı</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default function App () {
  const [completedSections, setCompletedSections] = useState([])
  const [activeTab, setActiveTab] = useState('home')
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  // Fontlar yüklenene kadar bekle
  if (!fontsLoaded) {
    return null;
  }

  const handleComplete = id => {
    if (!completedSections.includes(id)) {
      setCompletedSections([...completedSections, id])
    } else {
      const newCompletedSections = completedSections.filter(item => item < id)
      setCompletedSections(newCompletedSections)
    }
  }

  const isCompleted = id => completedSections.includes(id)

  // Handle tab navigation
  const handleTabPress = (tabName) => {
    setActiveTab(tabName)
  }

  const sections = [
    {
      id: 1,
      title: 'Expo CLI ile Başlangıç Projesi Kur',
      info: 'React Native geliştirmeye başlamanın en kolay yolu Expo CLI kullanmaktır. Expo, React Native uygulamaları geliştirmek için kullanılan bir araç setidir ve başlangıç için gereken yapılandırmaları otomatik olarak yapar.',
      code: `npm install -g expo-cli\nnpx create-expo-app my-first-app\ncd my-first-app\nnpm start`,
      tip: 'Expo Go uygulamasını telefonuna indirerek, bilgisayarında çalışan projeyi QR kod ile telefonunda anında görebilirsin. Bu sayede gerçek cihazda test yapabilirsin.'
    },
    {
      id: 2,
      title: 'Temel Bileşenleri Tanı',
      info: 'React Native\'de View ve Text, en temel bileşenlerdir. View, bir konteyner görevi görür (HTML\'deki div gibi) ve Text ise metin göstermek için kullanılır. StyleSheet API\'si ile CSS benzeri stilleri JavaScript nesneleri olarak tanımlayabilirsin.',
      code: `import { View, Text, StyleSheet } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Merhaba React Native!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n    backgroundColor: '#F5FCFF',\n  },\n  text: {\n    fontSize: 24,\n    fontWeight: 'bold',\n    color: '#333',\n  }\n});`,
      tip: 'React Native\'de flex layout kullanılır. Flex: 1 ile bir bileşenin mevcut alanı doldurmasını sağlayabilirsin. JustifyContent ve alignItems özellikleri ile içeriği yatay ve dikey olarak hizalayabilirsin.'
    },
    {
      id: 3,
      title: 'Kullanıcı Etkileşimi Ekle',
      info: 'TouchableOpacity, kullanıcı etkileşimleri için en yaygın kullanılan bileşenlerden biridir. Dokunma olaylarını yakalamak ve görsel geri bildirim sağlamak için kullanılır. Basıldığında hafifçe saydamlaşarak kullanıcıya geri bildirim verir.',
      code: `import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';\n\nexport default function App() {\n  const handlePress = () => {\n    Alert.alert('Bilgi', 'Butona tıklandı!');\n  };\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Etkileşimli Uygulama</Text>\n      <TouchableOpacity \n        style={styles.button} \n        onPress={handlePress}\n        activeOpacity={0.7}\n      >\n        <Text style={styles.buttonText}>Bana Tıkla</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n    backgroundColor: '#F5FCFF',\n  },\n  text: {\n    fontSize: 24,\n    marginBottom: 20,\n    color: '#333',\n  },\n  button: {\n    backgroundColor: '#845EC2',\n    paddingVertical: 12,\n    paddingHorizontal: 24,\n    borderRadius: 8,\n  },\n  buttonText: {\n    color: 'white',\n    fontSize: 16,\n    fontWeight: 'bold',\n  }\n});`,
      tip: 'Alert.alert() fonksiyonu ile kullanıcıya bilgi mesajları gösterebilirsin. TouchableOpacity dışında TouchableHighlight, TouchableWithoutFeedback ve Pressable gibi alternatif bileşenler de mevcuttur.'
    },
    {
      id: 4,
      title: 'Veri Yönetimi ve State',
      info: 'useState hook\'u, fonksiyonel bileşenlerde durum (state) yönetimi sağlar. Bu sayede bileşenin yeniden render edilmesini tetikleyecek değişkenleri tanımlayabilirsin. State değiştiğinde, bileşen otomatik olarak yeniden render edilir.',
      code: `import React, { useState } from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Sayaç Uygulaması</Text>\n      <Text style={styles.counter}>{count}</Text>\n      <View style={styles.buttonContainer}>\n        <TouchableOpacity \n          style={[styles.button, styles.decrementButton]} \n          onPress={() => setCount(count - 1)}\n        >\n          <Text style={styles.buttonText}>-</Text>\n        </TouchableOpacity>\n        <TouchableOpacity \n          style={[styles.button, styles.incrementButton]} \n          onPress={() => setCount(count + 1)}\n        >\n          <Text style={styles.buttonText}>+</Text>\n        </TouchableOpacity>\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n    backgroundColor: '#F5FCFF',\n  },\n  title: {\n    fontSize: 24,\n    marginBottom: 20,\n    color: '#333',\n  },\n  counter: {\n    fontSize: 72,\n    fontWeight: 'bold',\n    color: '#845EC2',\n    marginBottom: 30,\n  },\n  buttonContainer: {\n    flexDirection: 'row',\n    width: '60%',\n    justifyContent: 'space-between',\n  },\n  button: {\n    width: 60,\n    height: 60,\n    borderRadius: 30,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  decrementButton: {\n    backgroundColor: '#FF9671',\n  },\n  incrementButton: {\n    backgroundColor: '#00C9A7',\n  },\n  buttonText: {\n    color: 'white',\n    fontSize: 24,\n    fontWeight: 'bold',\n  }\n});`,
      tip: 'useState dışında useEffect, useContext, useReducer gibi diğer hook\'ları da kullanarak daha karmaşık durum yönetimi yapabilirsin. Büyük uygulamalarda Redux veya Context API gibi global durum yönetimi çözümleri tercih edilebilir.'
    },
    {
      id: 5,
      title: 'Listeler ve Veri Gösterimi',
      info: 'FlatList, büyük veri setlerini verimli bir şekilde göstermek için kullanılan performanslı bir bileşendir. Sadece ekranda görünen öğeleri render eder ve kullanıcı kaydırdıkça yeni öğeleri yükler. Bu sayede bellek kullanımı optimize edilir.',
      code: `import React from 'react';\nimport { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';\n\nexport default function App() {\n  const data = [\n    { id: '1', title: 'React Native Temelleri', lessons: 5 },\n    { id: '2', title: 'Bileşenler ve Props', lessons: 8 },\n    { id: '3', title: 'State Yönetimi', lessons: 6 },\n    { id: '4', title: 'Stil ve Tasarım', lessons: 10 },\n    { id: '5', title: 'Navigasyon', lessons: 7 },\n    { id: '6', title: 'API İstekleri', lessons: 4 },\n    { id: '7', title: 'Yerel Depolama', lessons: 3 },\n    { id: '8', title: 'Animasyonlar', lessons: 9 },\n  ];\n\n  const renderItem = ({ item, index }) => (\n    <TouchableOpacity style={styles.item}>\n      <View style={styles.itemContent}>\n        <View style={[styles.itemNumber, { backgroundColor: index % 2 === 0 ? '#845EC2' : '#FF9671' }]}>\n          <Text style={styles.itemNumberText}>{item.id}</Text>\n        </View>\n        <View style={styles.itemDetails}>\n          <Text style={styles.itemTitle}>{item.title}</Text>\n          <Text style={styles.itemLessons}>{item.lessons} ders</Text>\n        </View>\n      </View>\n    </TouchableOpacity>\n  );\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.header}>Kurslarım</Text>\n      <FlatList\n        data={data}\n        renderItem={renderItem}\n        keyExtractor={item => item.id}\n        showsVerticalScrollIndicator={false}\n        contentContainerStyle={styles.listContent}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: '#F5FCFF',\n    paddingTop: 50,\n  },\n  header: {\n    fontSize: 28,\n    fontWeight: 'bold',\n    marginBottom: 20,\n    paddingHorizontal: 16,\n    color: '#333',\n  },\n  listContent: {\n    paddingHorizontal: 16,\n    paddingBottom: 20,\n  },\n  item: {\n    backgroundColor: 'white',\n    borderRadius: 10,\n    marginBottom: 12,\n    shadowColor: '#000',\n    shadowOffset: { width: 0, height: 1 },\n    shadowOpacity: 0.05,\n    shadowRadius: 2,\n    elevation: 2,\n  },\n  itemContent: {\n    flexDirection: 'row',\n    padding: 16,\n    alignItems: 'center',\n  },\n  itemNumber: {\n    width: 36,\n    height: 36,\n    borderRadius: 18,\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginRight: 12,\n  },\n  itemNumberText: {\n    color: 'white',\n    fontWeight: 'bold',\n  },\n  itemDetails: {\n    flex: 1,\n  },\n  itemTitle: {\n    fontSize: 16,\n    fontWeight: 'bold',\n    color: '#333',\n    marginBottom: 4,\n  },\n  itemLessons: {\n    fontSize: 14,\n    color: '#666',\n  },\n});`,
      tip: 'FlatList\'in performansını artırmak için getItemLayout, windowSize, maxToRenderPerBatch gibi prop\'ları kullanabilirsin. Ayrıca, SectionList bileşeni ile kategorilere ayrılmış listeler oluşturabilirsin.'
    },
    {
      id: 6,
      title: 'Navigasyon ve Çoklu Ekranlar',
      info: 'React Navigation, React Native uygulamalarında ekranlar arası geçişleri yönetmek için en popüler kütüphanedir. Stack, Tab, Drawer gibi farklı navigasyon tipleri sunar ve ekranlar arası veri aktarımını kolaylaştırır.',
      code: `// App.js\nimport React from 'react';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createStackNavigator } from '@react-navigation/stack';\nimport HomeScreen from './screens/HomeScreen';\nimport DetailsScreen from './screens/DetailsScreen';\n\nconst Stack = createStackNavigator();\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator \n        initialRouteName="Home"\n        screenOptions={{\n          headerStyle: {\n            backgroundColor: '#845EC2',\n          },\n          headerTintColor: '#fff',\n          headerTitleStyle: {\n            fontWeight: 'bold',\n          },\n        }}\n      >\n        <Stack.Screen \n          name="Home" \n          component={HomeScreen} \n          options={{ title: 'Ana Sayfa' }} \n        />\n        <Stack.Screen \n          name="Details" \n          component={DetailsScreen} \n          options={({ route }) => ({ title: route.params.title })}\n        />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n\n// HomeScreen.js\nimport React from 'react';\nimport { View, Text, Button, StyleSheet } from 'react-native';\n\nexport default function HomeScreen({ navigation }) {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Ana Sayfa</Text>\n      <Button\n        title="Detay Sayfasına Git"\n        onPress={() => {\n          navigation.navigate('Details', {\n            itemId: 86,\n            title: 'Ürün Detayı',\n          });\n        }}\n      />\n    </View>\n  );\n}\n\n// DetailsScreen.js\nimport React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function DetailsScreen({ route, navigation }) {\n  const { itemId, title } = route.params;\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Detay Sayfası</Text>\n      <Text>Ürün ID: {itemId}</Text>\n      <Text>Başlık: {title}</Text>\n    </View>\n  );\n}`,
      tip: 'React Navigation ile Tab, Drawer, Stack gibi farklı navigasyon tiplerini birleştirerek karmaşık navigasyon yapıları oluşturabilirsin. Ayrıca, useNavigation ve useRoute hook\'ları ile herhangi bir bileşenden navigasyon fonksiyonlarına ve route parametrelerine erişebilirsin.'
    }
  ]

  // Render the appropriate screen based on the active tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            sections={sections}
            completedSections={completedSections}
            handleComplete={handleComplete}
            isCompleted={isCompleted}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            completedSections={completedSections}
            totalSections={sections.length}
          />
        );
      default:
        return (
          <HomeScreen
            sections={sections}
            completedSections={completedSections}
            handleComplete={handleComplete}
            isCompleted={isCompleted}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />

      {/* Header - Only show on non-profile screens */}
      {activeTab !== 'profile' && (
        <SafeAreaView style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="react" size={28} color="#6a40f6" style={styles.logoIcon} />
            <Text style={styles.logoText}>LeaNative</Text>
          </View>
        </SafeAreaView>
      )}

      {/* Main Content */}
      {renderScreen()}

      {/* Bottom Navigation */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={[styles.menuItem, activeTab === 'home' && styles.activeMenuItem]}
          onPress={() => handleTabPress('home')}
        >
          <Icon
            name='home'
            size={22}
            color={activeTab === 'home' ? '#6a40f6' : '#B8B8B8'}
            solid={activeTab === 'home'}
          />
          <Text style={[styles.menuItemText, activeTab === 'home' && styles.activeMenuItemText]}>
            Ana Sayfa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, activeTab === 'profile' && styles.activeMenuItem]}
          onPress={() => handleTabPress('profile')}
        >
          <Icon
            name='user'
            size={22}
            color={activeTab === 'profile' ? '#6a40f6' : '#B8B8B8'}
            solid={activeTab === 'profile'}
          />
          <Text style={[styles.menuItemText, activeTab === 'profile' && styles.activeMenuItemText]}>
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    paddingTop: 50, // Kamera çentiği için daha fazla boşluk
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start', // Sola yasla
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Sola yasla
  },
  logoIcon: {
    marginRight: 12,
  },
  logoText: {
    fontSize: 30,
    color: '#6a40f6',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },

  // Home Screen
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 100, // Increased to accommodate bottom menu
    paddingHorizontal: 16
  },
  welcomeSection: {
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  welcomeImageContainer: {
    marginLeft: 10,
  },
  imageBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6a40f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a40f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#F0F0F0',
  },

  // Lesson Sections
  educateSection: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 12,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  completedSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#6a40f6',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionNumber: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-Bold',
  },
  collapsedCompletedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  collapsedCompletedText: {
    fontSize: 14,
    color: '#6a40f6',
    marginLeft: 6,
    fontWeight: '500',
  },

  // New Lesson Content Styles
  lessonContentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6a40f6',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
  lessonInfoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  codeContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionCodeText: {
    fontSize: 14,
    fontFamily: 'monospace', // Kod için monospace font kullanıyoruz
    color: '#333',
    lineHeight: 20,
  },
  tipContainer: {
    backgroundColor: '#F0F0FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#6a40f6',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontStyle: 'italic',
    fontFamily: 'Poppins-Regular',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  completedButton: {
    backgroundColor: '#F0F0FF',
    borderColor: '#6a40f6',
  },
  completeButtonText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 6,
    fontFamily: 'Poppins-Regular',
  },
  completedButtonText: {
    color: '#6a40f6',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },

  // Bottom Navigation
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  activeMenuItem: {
    backgroundColor: '#F0F0FF',
  },
  menuItemText: {
    fontSize: 12,
    marginTop: 4,
    color: '#B8B8B8',
    fontFamily: 'Poppins-Regular',
  },
  activeMenuItemText: {
    color: '#6a40f6',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },

  // Profile Screen
  profileScrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileScrollViewContent: {
    paddingBottom: 100, // Add padding to avoid content being hidden by bottom menu
  },
  profileHeader: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImageBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  profileBio: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  profileStatsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    justifyContent: 'space-around',
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  profileStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileContent: {
    padding: 20,
  },
  profileSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  profileSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    fontFamily: 'Poppins-Bold',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementItem: {
    alignItems: 'center',
    width: width / 3.8,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Poppins-Bold',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  nextLessonContainer: {
    marginTop: 10,
  },
  nextLessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
  },
  nextLessonCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  nextLessonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#6a40f6',
  },
  nextLessonInfo: {
    flex: 1,
  },
  nextLessonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  nextLessonButton: {
    backgroundColor: '#6a40f6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  nextLessonButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  allCompletedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0FF',
    padding: 15,
    borderRadius: 12,
  },
  allCompletedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a40f6',
    marginLeft: 10,
    fontFamily: 'Poppins-Bold',
  }
})
