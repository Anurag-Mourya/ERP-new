import { combineReducers } from 'redux';
import { accountListReducer, categoryListReducer, creditNoteListReducer, customListReducer, invoiceListReducer, itemListReducer, quoatationListReducer, saleOrderListReducer, vendorListReducer } from './listApisReducers';
import { activeInactiveItemReducer, addItemsReducer, itemDeleteReducer, itemsDetailReducer, stockItemsReducer } from './itemsReducers';
import { masterDataReducer, countriesDataReducer, citiesDataReducer, stateDataReducer, createCustomReducer } from './globalReducers';
import { createCategoryReducer, createSubCategoryReducer } from './categoryReducers';
import { createCustomerReducer, customerListReducer, viewCustomerReducer } from './customerReducers';
import { quotationDetailReducer } from './quotationReducers';
import { saleOrderDetailReducer } from './saleOrderReducers';
import { invoiceDetailReducer } from './invoiceReducers';
import { creditNoteDetailReducer } from './noteReducers';

const reducer = combineReducers({
    addItemsReducer,
    stockAdjustment: stockItemsReducer,
    itemDetail: itemsDetailReducer,
    masterData: masterDataReducer,
    createCategory: createCategoryReducer,
    createSubCategory: createSubCategoryReducer,
    createCustomer: createCustomerReducer,
    viewCustomer: viewCustomerReducer,
    customerList: customerListReducer,
    categoryList: categoryListReducer,
    itemList: itemListReducer,
    accountList: accountListReducer,
    quoteList: quoatationListReducer,
    quoteDetail: quotationDetailReducer,
    saleList: saleOrderListReducer,
    vendorList: vendorListReducer,
    saleDetail: saleOrderDetailReducer,
    invoiceDetail: invoiceDetailReducer,
    invoiceList: invoiceListReducer,
    creditNoteList: creditNoteListReducer,
    creditNoteDetail: creditNoteDetailReducer,
    countries: countriesDataReducer,
    states: stateDataReducer,
    cities: citiesDataReducer,
    statues: activeInactiveItemReducer,
    deleteItem: itemDeleteReducer,
    createCustom: createCustomReducer,
    customList: customListReducer,
});
export default reducer;
