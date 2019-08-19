
export class LocalStorage {
  static storeData(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
 

   

   static getData (key) {
    try {
     return JSON.parse(localStorage.getItem(key))
     } catch (err) {
      console.error("Unable to restore cached data for " + key, err)
      return null
     }
   }
}