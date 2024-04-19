import { combineReducers } from 'redux';
import { accountListReducer, categoryListReducer, creditNoteListReducer, invoiceListReducer, itemListReducer, quoatationListReducer, saleOrderListReducer } from './listApisReducers';
import { addItemsReducer, itemsDetailReducer, stockItemsReducer } from './itemsReducers';
import masterDataReducer from './globalReducers';
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
    saleDetail: saleOrderDetailReducer,
    invoiceDetail: invoiceDetailReducer,
    invoiceList: invoiceListReducer,
    creditNoteList: creditNoteListReducer,
    creditNoteDetail: creditNoteDetailReducer,
});
export default reducer;
