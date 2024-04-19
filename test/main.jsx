{/* starting new table code */ }
<div id="middlesection">
    <div id="Anotherbox">
        <div id="leftareax12">
            <h1 id="firstheading">
                <img src={"/Icons/bags-shopping.svg"} alt="" />
                Manage Sales Orders <Obj></Obj>
            </h1>

            {/* <p id="firsttagp">{itemList?.data?.total_items} records</p> */}

            <div id="searchbox">
                <input
                    id="commonmcsearchbar"
                    type="text"
                    placeholder="Search organization"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <IoSearchOutline />
            </div>
        </div>

        <div id="buttonsdata">
            <div className="mainx1">
                <img src="/Icons/sort-size-down.svg" alt="" />
                <p>Sort by</p>
            </div>
            <div className="mainx1">
                <img src="/Icons/filters.svg" alt="" />
                <p>Filter</p>
            </div>
            <Link className="linkx1" to={"/dashboard/create-items"}>
                Create Item <GoPlus />
            </Link>
        </div>
    </div>

    <div id="mainsectioncsls">
        <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
                {itemList?.loading && !dataChanging && (
                    <div id="spearateheightforloader">
                        <Loader02 />
                    </div>
                )}
                <div id="newtableofagtheme">
                    <div className="table-headerx12">
                        <div className="table-cellx12 serialnumber">S.No</div>
                        <div className="table-cellx12 namefield">Sale Order Id</div>
                        <div className="table-cellx12 x23field">Refrence No</div>
                        {newstatex1 && (
                            <>
                                <div className="table-cellx12 x24field">Customer Name</div>
                                {/* <div className="table-cellx12">Unit</div> */}
                                <div className="table-cellx12 otherfields">Status</div>
                                <div className="table-cellx12 pricex2s">Total</div>
                                {/* <div className="table-cellx12">Created At</div> */}
                            </>
                        )}
                    </div>
                    {itemList?.data?.item?.map((quotation, index) => (
                        <div
                            className={`table-rowx12 ${selectedQuotation && selectedQuotation.id === quotation.id
                                ? "selectedresult"
                                : ""
                                }`}
                            key={index}
                            onClick={() => handleRowClicked(quotation)}
                        >
                            <div className="table-cellx12 serialnumber">{index + 1}</div>
                            <div className="table-cellx12 namefield">{quotation.name}</div>
                            <div className="table-cellx12 x23field">{quotation.sku}</div>

                            {newstatex1 && (
                                <>
                                    <div className="table-cellx12 x24field">{quotation.type}</div>
                                    {/* <div className="table-cellx12">{quotation.unit}</div> */}
                                    <div className="table-cellx12 otherfields">{quotation.description}</div>
                                    <div className="table-cellx12 pricex2s">{quotation.price}/-</div>
                                    {/* <div className="table-cellx12">{new Date(quotation.created_at).toLocaleDateString("en-GB")}</div> */}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div id="filterbox">
                <div id="buttonsdataxsd585">
                    <div id="itemsPerPage">
                        <label htmlFor="itemsPerPage">Items per page </label>

                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
                <div className="paginationofeachsegment">
                    <button
                        className="buttonsforprevnext"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <LiaAngleLeftSolid />
                        {/* Prev */}
                    </button>
                    <p>{pagination}</p>
                    <button
                        className="buttonsforprevnext"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {/* Next */}
                        <LiaAngleRightSolid />
                    </button>
                </div>
            </div>
        </div>
        {/* Display quotation details */}

        {loadingSelectedQuotation ? (
            <div id="rightsidecontentxsa">
                <Loader02 />
            </div>
        ) : (
            <>
                {selectedQuotation && !loadingSelectedQuotation && (
                    <div id="rightsidecontentxsa">
                        <div id="item-details">
                            <div className="topitemdetailsrow">
                                <h2>
                                    {/* <img src="https://cdn-icons-png.freepik.com/512/6474/6474448.png?ga=GA1.1.1132558896.1711309931&" alt="" /> */}
                                    {selectedQuotation.name}
                                </h2>

                                <div id="middletoolofqls">
                                    <div className="childmisdlsx56s">
                                        <VscEdit /> Edit
                                    </div>

                                    <div className="childmisdlsx56s">
                                        <RxDotsHorizontal />
                                    </div>
                                </div>
                                <div id="insidetedsroswlxk">
                                    <div onClick={handleHideItemDetails}>
                                        <RxCross2 />
                                    </div>
                                    <Link to={"#"}>
                                        <TfiHelpAlt />
                                    </Link>
                                </div>
                            </div>
                            <InsideItemDetailsBox
                                selectedQuotation={selectedQuotation}
                            />
                        </div>
                    </div>
                )}
            </>
        )}
    </div>
    <Toaster />
</div>