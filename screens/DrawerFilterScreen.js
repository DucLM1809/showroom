import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { MultiSelect, Dropdown } from 'react-native-element-dropdown'
import { useCategories } from '../hooks/usePost'
import Spinner from 'react-native-loading-spinner-overlay'
import { ORDER_OPTION, POST_STATUS } from '../constants/post'

const DrawerFilterScreen = ({
  setModalVisible,
  categories,
  setCategories,
  orderBy,
  setOrderBy,
  status,
  setStatus
}) => {
  const { loading, response } = useCategories()

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <View className='w-full p-4'>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className='mb-4 flex-row justify-end'
        >
          <MaterialIcons
            name='close'
            size={20}
            style={{
              flexShrink: 10,
              color: '#777777',
              padding: 12,
              backgroundColor: '#F0F0F3',
              borderRadius: 200
            }}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Spinner visible={loading} />
      ) : (
        <>
          <View className='flex w-full px-4 mb-4'>
            <Text className='text-xl font-bold mb-2'>Categories</Text>
            <MultiSelect
              placeholder='Select Categories'
              labelField='label'
              valueField='value'
              search
              data={
                response
                  ? response?.map((item) => ({
                      value: item?.name,
                      label: item?.name
                    }))
                  : []
              }
              onChange={(item) => setCategories(item)}
              value={categories}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
            />
          </View>

          <View className='flex w-full px-4 mb-4'>
            <Text className='text-xl font-bold mb-2'>Order</Text>

            <Dropdown
              placeholder='Select order'
              labelField='label'
              valueField='value'
              search
              data={
                ORDER_OPTION
                  ? Object.values(ORDER_OPTION)?.map((item) => ({
                      value: item,
                      label: item
                    }))
                  : []
              }
              onChange={(item) => setOrderBy(item?.value)}
              value={orderBy}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
            />
          </View>

          <View className='flex w-full px-4 mb-4'>
            <Text className='text-xl font-bold mb-2'>Order</Text>

            <Dropdown
              placeholder='Select status'
              labelField='label'
              valueField='value'
              search
              data={
                POST_STATUS
                  ? Object.values(POST_STATUS)?.map((item) => ({
                      value: item,
                      label: item
                    }))
                  : []
              }
              onChange={(item) => setStatus(item?.value)}
              value={status}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default DrawerFilterScreen

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 14
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16
  }
})
