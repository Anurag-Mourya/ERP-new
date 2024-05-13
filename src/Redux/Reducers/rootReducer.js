import { combineReducers } from 'redux';
import { accountListReducer, categoryListReducer, creditNoteListReducer, customListReducer, invoiceListReducer, itemListReducer, journalListReducer, purchseListReducer, quoatationListReducer, saleOrderListReducer, vendorListReducer } from './listApisReducers';
import { activeInactiveItemReducer, addItemsReducer, itemDeleteReducer, itemExportReducer, itemImportReducer, itemsDetailReducer, stockItemsReducer } from './itemsReducers';
import { masterDataReducer, countriesDataReducer, citiesDataReducer, stateDataReducer, createCustomReducer, getCurrencyReducer, getTaxRateReducer, updateAddressReducer } from './globalReducers';
import { categoryStatusReducer, createCategoryReducer, createSubCategoryReducer, deleteCategoryReducer, subCategoryListReducer } from './categoryReducers';
import { createCustomerReducer, customerListReducer, viewCustomerReducer } from './customerReducers';
import { quotationDetailReducer, quotationUpdateReducer } from './quotationReducers';
import { saleOrderDetailReducer } from './saleOrderReducers';
import { invoiceDetailReducer } from './invoiceReducers';
import { creditNoteDetailReducer } from './noteReducers';
import { vendorCreateReducer, vendorViewReducer } from './vendorReducers';
import { accountTypeReducer, createAccountReducer, journalsReducer } from './accountReducers';

const reducer = combineReducers({
    addItemsReducer,
    stockAdjustment: stockItemsReducer,
    itemDetail: itemsDetailReducer,
    itemList: itemListReducer,
    importItems: itemImportReducer,
    exportItems: itemExportReducer,
    masterData: masterDataReducer,
    createCategory: createCategoryReducer,
    createSubCategory: createSubCategoryReducer,
    categoryStatus: categoryStatusReducer,
    createCustomer: createCustomerReducer,
    viewCustomer: viewCustomerReducer,
    customerList: customerListReducer,
    categoryList: categoryListReducer,
    deleteCategory: deleteCategoryReducer,
    subCategoryList: subCategoryListReducer,
    accountList: accountListReducer,
    journalList: journalListReducer,
    quoteList: quoatationListReducer,
    quoteDetail: quotationDetailReducer,
    saleList: saleOrderListReducer,
    vendorList: vendorListReducer,
    vendorView: vendorViewReducer,
    purchseList: purchseListReducer,
    createVendor: vendorCreateReducer,
    saleDetail: saleOrderDetailReducer,
    invoiceDetail: invoiceDetailReducer,
    invoiceList: invoiceListReducer,
    creditNoteList: creditNoteListReducer,
    creditNoteDetail: creditNoteDetailReducer,
    countries: countriesDataReducer,
    states: stateDataReducer,
    cities: citiesDataReducer,
    status: activeInactiveItemReducer,
    deleteItem: itemDeleteReducer,
    createCustom: createCustomReducer,
    customList: customListReducer,
    quoteUpdate: quotationUpdateReducer,
    getCurrency: getCurrencyReducer,
    getTaxRate: getTaxRateReducer,
    updateAddress: updateAddressReducer,
    createJournal: journalsReducer,
    getAccType: accountTypeReducer,
    createAccount: createAccountReducer,
});

export default reducer;
