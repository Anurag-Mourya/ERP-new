import { combineReducers } from 'redux';
import { accountListReducer, categoryListReducer, creditNoteListReducer, customListReducer, invoiceListReducer, itemListReducer, journalListReducer, paymentRecListReducer, purchseListReducer, quoatationListReducer, saleOrderListReducer, vendorListReducer } from './listApisReducers';
import { activeInactiveItemReducer, addItemsReducer, itemDeleteReducer, itemExportReducer, itemImportReducer, itemsDetailReducer, stockItemsReducer } from './itemsReducers';
import { masterDataReducer, countriesDataReducer, citiesDataReducer, stateDataReducer, createCustomReducer, getCurrencyReducer, getTaxRateReducer, updateAddressReducer, expenseHeadListReducer } from './globalReducers';
import { categoryStatusReducer, createCategoryReducer, createSubCategoryReducer, deleteCategoryReducer, subCategoryListReducer } from './categoryReducers';
import { createCustomerReducer, customerDeleteReducer, customerListReducer, customerStatusReducer, viewCustomerReducer } from './customerReducers';
import { quotationDeleteReducer, quotationDetailReducer, quotationStatusReducer, quotationUpdateReducer } from './quotationReducers';
import { saleOrderDeleteReducer, saleOrderDetailReducer, saleOrderStatusReducer } from './saleOrderReducers';
import { invoiceDeleteReducer, invoiceDetailReducer, invoicePendingReducer, invoiceStatusReducer } from './invoiceReducers';
import { creditNoteDeleteReducer, creditNoteDetailReducer } from './noteReducers';
import { vendorCreateReducer, vendorDeleteReducer, vendorStatusReducer, vendorViewReducer } from './vendorReducers';
import { JournalDetailReducer, accountDeleteReducer, accountStatusReducer, accountTypeReducer, createAccountReducer, journalsReducer } from './accountReducers';
import { paymentRecLists } from '../Actions/listApisActions';
import { createPaymentReducer, paymentDeleteReducer, paymentDetailReducer, paymentStatusReducer } from './paymentReducers';
import { billDeleteReducer, billDetailReducer, billListReducer } from './billReducers';
import { createPurchasesReducer, purchasesDeleteReducer, purchasesDetailsReducer } from './purchasesReducers';
import { expenseCreateReducer, expenseListReducer } from './expenseReducers';

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
    customerDelete: customerDeleteReducer,
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
    saleDetail: saleOrderDetailReducer,
    saleStatus: saleOrderStatusReducer,
    vendorList: vendorListReducer,
    vendorView: vendorViewReducer,
    vendorDelete: vendorDeleteReducer,
    vendorStatus: vendorStatusReducer,
    purchseList: purchseListReducer,
    createVendor: vendorCreateReducer,
    saleDelete: saleOrderDeleteReducer,
    invoiceDetail: invoiceDetailReducer,
    invoiceList: invoiceListReducer,
    invoicesStatus: invoiceStatusReducer,
    invoicesDelete: invoiceDeleteReducer,
    invoicePending: invoicePendingReducer,
    creditNoteList: creditNoteListReducer,
    creditNoteDetail: creditNoteDetailReducer,
    creditNoteDelete: creditNoteDeleteReducer,
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
    paymentRecList: paymentRecListReducer,
    paymentRecDelete: paymentDeleteReducer,
    paymentRecDetail: paymentDetailReducer,
    paymentRecStatus: paymentStatusReducer,
    createPayment: createPaymentReducer,
    journalDetail: JournalDetailReducer,
    billList: billListReducer,
    billDetail: billDetailReducer,
    billDelete: billDeleteReducer,
    createPurchase: createPurchasesReducer,
    detailsPurchase: purchasesDetailsReducer,
    deletePurchase: purchasesDeleteReducer,
    expenseCreate: expenseCreateReducer,
    expenseList: expenseListReducer,
    expenseHeadList: expenseHeadListReducer,

});

export default reducer;
