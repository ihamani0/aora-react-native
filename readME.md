## input ##
onChangeText = handle change of input 
onBlur : callBack
onFouces : callBack
maxLenght : number 
minLenght : number
multiLine : bool
numberOfLine : number 
keyBoardType : email numric 
secureTextEntry= like type password in input  
autoCapitalize='word' chartarte none 
autoCorrect
autoContentSizeChange
editeTable
onSumbmitEditing

## Text##
 numberOfLines={1} 
 onLongPress={pressMe} 


## ScrollView##

contentContainerStyle = StyleSheet  **example** =>  {{alignItems: 'center' , justifyContent: 'center' }}  
horizontal= **bool** {true}
showsHorizontalScrollIndicator= **bool** {false}
showsVerticalScrollIndicator= **bool** {false}
scrollEnabled= **bool** {false}
showsVerticalScrollIndicator= **bool**  {false}
onScroll= CallBack  **example** => console.log('scrolling')}

## Style Sheet 
comaps is combine to style togther 


## FlatList

datakeyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => <Item name={item.name} age={item.age} />}

ListHeaderComponent={<Text style={styles.header}>User List</Text>}

ListFooterComponent={<Text style={styles.footer}>End of List</Text>}

contentContainerStyle={styles.list}
refreshing={refresh}
onRefresh={handlRefresh}

freshControll = Accsept RefreshConttrol component 

## RefreshConttrol
refreshing : bool 
onRefresh : callBack function

title : String

---IOS---
tintColor :  {'color'}
titleColor :  {'color'}
---android---
colors : { 'color '}


## SecetionList
section : data

## DrawerLayoutAndroid
ref= variable pour ref to the sideBar   {drawerRef}
drawerWidth :  value 
drawerPosition  : "left | Right"
renderNavigationView : callBack function to the sideBar components
closeDrawer()
openDrawer()

onDraweOpen 
onCloseDrawe

## Permsion Android 
const requestCameraPermission = async () => {
    // Request camera permissions using Expo's API
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === 'granted') {
      Alert.alert('Permission Granted');
    } else {
      Alert.alert('Permission Denied');
    }
  };

## Toast Android 
show
showWithGravity
ToastAndroid.showWithGravityAndOffset("This is a Toast gravity n offest", ToastAndroid.LONG  , ToastAndroid.CENTER , 25,
50);


## ActivityIndicator laod spinner
  animating : bool
  size : larg | small
  color : 




  <!-- let apidata = [
    { id: 1, name: 'John', age: 25 },
    { id: 12, name: 'ess', age: 25 },
    { id: 13, name: 'Joshn', age: 25 },
    // { id: 14, name: 'ads', age: 25 },
    // { id: 15, name: 'xcz', age: 25 },
    // { id: 125, name: 'xcz', age: 25 },
    // { id: 152, name: 'xcz', age: 25 },
    // { id: 165, name: 'xcz', age: 25 },
    // { id: 115, name: 'xcz', age: 25 },
    // { id: 105, name: 'xcz', age: 25 },
  ]; -->