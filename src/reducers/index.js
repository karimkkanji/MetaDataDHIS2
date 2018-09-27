import {combineReducers} from 'redux'
import programs from './programsReducer'
import dataElements from './dataElementsReducer'
import dataSets from './dataSetReducer'
import indicators from './indicatorReducer'

export default combineReducers({
    programs,
    dataElements,
    dataSets,
    indicators,
})