import {playMode} from 'common/js/config'
import {loaderSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loaderSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state
