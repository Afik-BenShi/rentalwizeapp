import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../assets/theme';


export default function CardList({ items, title, onItemPressed = (_) => { }}) {
  const placeholderImage = require('../../assets/parking-details-images/placeholder.png');
  
  if (!items) {
    
    return (
      <SafeAreaView style={{ backgroundColor: COLORS.cardBackground }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text>No items to show</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.cardBackground }}>
      
      <ScrollView
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>

          {items.map(
            (item, index) => {
              const { id, title, pricePerDay, startDate, endDate, description, ownerId, city, distanceFromMe, urlToimage } = item;
              const image = urlToimage? { uri: urlToimage } : placeholderImage;
              return (

                <View key={index} style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() => onItemPressed(item)}>
                    <View style={styles.card}>
                      <Image
                        alt=""
                        resizeMode="cover"
                        source={image}
                        style={styles.cardImg}
                      />
                      <View style={styles.cardBody}>

                        <Text>
                          <Text style={styles.cardTitle}>{title.length > 25 ? title.substring(0, 22) + '...' : title}</Text>
                          {'\n'}
                          <Text style={styles.cardCity}>{city}</Text>
                        </Text>
                        <Text style={styles.cardPrice}>
                          <Text style={styles.cardPriceValue}>
                            <Icon name="currency-ils" style={styles.shekel} />
                            {pricePerDay.toLocaleString('en-US')}{' '}
                          </Text>
                          <Text style={styles.cardPriceCurrency}>/day</Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>


                </View>
              );
            },
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 140
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%', // Adjust as needed, considering margins and paddings
    marginBottom: 14,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: 12,
    backgroundColor: '#fff',
    height: 262,
    elevation: 2, // Add elevation for shadow effect
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    shadowOffset: {
      width: 0, // Shadow offset width
      height: 2, // Shadow offset height
    },
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#173153',
    marginRight: 8,
    flexGrow: 1,
  },
  cardCity: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5f697d',
  },
  headerLocationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.greyTextInExtendedProduct,
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5f697d',
  },
  cardPriceValue: {
    fontSize: 21,
    fontWeight: '700',
    color: '#173153',
  },
  shekel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#173153',
  },
  cardPriceCurrency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6f61c4',
  },

});
