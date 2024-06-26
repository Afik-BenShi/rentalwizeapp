/**
 * @typedef {{
 *  id: string,
 *  title: string,
 *  description: string,
 *  price:{
 *      amount: number,
 *      currency: string,
 *      duration: "hour"|"day"|"week"|"month"
 *  },
 *  location: {
 *      latitude: number,
 *      longitude: number,
 *      address: string,
 *  },
 *  address: {
 *      lat: number,
 *      lng: number,
 *  },
 *  owner: {
 *      id: string,
 *      name: string,
 *      phoneNumber: string,
 *  },
 *  image?: string,
 *  imageToSave?: string,
 *  availability: {
 *      startDate: Date,
 *      endDate: Date,
 *  },
 * }} ProductDetails
 */

/**
 * @typedef {{
 *  id?: string,
 *  productId: string,
 *  ownerId: string,
 *  scheduling:{
 *      startDate: Date,
 *      endDate: Date,
 *  },
 *  reservingUser: {
 *      id: string,
 *      name: string,
 *      phoneNumber:string,
 *  },
 * }} ProductReservation
 */

/**
 * @typedef {import('@react-navigation/native-stack').NativeStackScreenProps<{
 *   productDetails: {
 *     details: ProductDetails,
 *     onReserveParking?: (reservation: ProductReservation) => void | Promise<void>,
 *   },
 * }, "productDetails">} ProductDetailsPageProps
 */
