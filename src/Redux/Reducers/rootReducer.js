import { combineReducers } from 'redux';
import { accountListReducer, categoryListReducer, creditNoteListReducer, customListReducer, invoiceListReducer, itemListReducer, journalListReducer, purchseListReducer, quoatationListReducer, saleOrderListReducer, vendorListReducer } from './listApisReducers';
import { activeInactiveItemReducer, addItemsReducer, itemDeleteReducer, itemExportReducer, itemImportReducer, itemsDetailReducer, stockItemsReducer } from './itemsReducers';
import { masterDataReducer, countriesDataReducer, citiesDataReducer, stateDataReducer, createCustomReducer, getCurrencyReducer, getTaxRateReducer, updateAddressReducer } from './globalReducers';
import { categoryStatusReducer, createCategoryReducer, createSubCategoryReducer, deleteCategoryReducer, subCategoryListReducer } from './categoryReducers';
import { createCustomerReducer, customerListReducer, customerStatusReducer, viewCustomerReducer } from './customerReducers';
import { quotationDeleteReducer, quotationDetailReducer, quotationStatusReducer, quotationUpdateReducer } from './quotationReducers';
import { saleOrderDeleteReducer, saleOrderDetailReducer, saleOrderStatusReducer } from './saleOrderReducers';
import { invoiceDeleteReducer, invoiceDetailReducer, invoiceStatusReducer } from './invoiceReducers';
import { creditNoteDetailReducer } from './noteReducers';
import { vendorCreateReducer, vendorViewReducer } from './vendorReducers';
import { accountDeleteReducer, accountStatusReducer, accountTypeReducer, createAccountReducer, journalsReducer } from './accountReducers';
import { paymentRecLists } from '../Actions/listApisActions';

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
    customerStatus: customerStatusReducer,
    viewCustomer: viewCustomerReducer,
    customerList: customerListReducer,
    categoryList: categoryListReducer,
    deleteCategory: deleteCategoryReducer,
    subCategoryList: subCategoryListReducer,
    accountList: accountListReducer,
    accountStatus: accountStatusReducer,
    journalList: journalListReducer,
    quoteList: quoatationListReducer,
    quoteDetail: quotationDetailReducer,
    quoteStatus: quotationStatusReducer,
    quoteDelete: quotationDeleteReducer,
    saleList: saleOrderListReducer,
    vendorList: vendorListReducer,
    vendorView: vendorViewReducer,
    purchseList: purchseListReducer,
    createVendor: vendorCreateReducer,
    saleDetail: saleOrderDetailReducer,
    saleStatus: saleOrderStatusReducer,
    saleDelete: saleOrderDeleteReducer,
    invoiceDetail: invoiceDetailReducer,
    invoiceList: invoiceListReducer,
    invoicesStatus: invoiceStatusReducer,
    invoicesDelete: invoiceDeleteReducer,
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
    deleteAccount: accountDeleteReducer,
    paymentRecList: paymentRecLists,
});

export default reducer;
