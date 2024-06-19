import React from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

const Purchase_Reports = () => {
  return (
    <>
    <div className="maindivofreporstx5w633">
    <div className="reportbarinsx5w">
        <h1>Purchase Report</h1>
        <div className="rightfiltex4w">
            <div className="xw15sf5w5s6">{otherIcons?.print_svg}Print</div>
            <div className="xw15sf5w5s6">{otherIcons?.export_svg}Export as PDF</div>
            <Link className="crossicox45wsx2w3" to={"/dashboard/reports"}>
            <RxCross2 />
          </Link>
        </div>
      </div>

    <div className="x45w63s6re5x">
        <div className="rex45w6s6">
            <div className="xlwre2x6w6 activedjlsw">All</div>
            <div className="xlwre2x6w6">By type</div>
            <div className="xlwre2x6w6">By customer</div>
        </div>

        <div className="xkllkre56w">
        <p>From 01 Dec 2021 To 31 Dec 2021</p>
        </div>


        <div className="repockjtdatatablx">
            <div className="table-headerx12">
                <div className="table-cellx12">DATE</div>
                <div className="table-cellx12">EXPENSE ACCOUNT</div>
                <div className="table-cellx12">EXPENSE TYPE</div>
                <div className="table-cellx12">AMOUNT</div>
                <div className="table-cellx12">PAID THROUGH</div>
                <div className="table-cellx12">Attachment</div>
            </div>


            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>

            <div  className='table-rowx12'>
            <div className="table-cellx12">25/12/2021</div>
            <div className="table-cellx12">[ 78135 ] Employee advance</div>
            <div className="table-cellx12">Rent or Lease Payments</div>
            <div className="table-cellx12">13568</div>
            <div className="table-cellx12">UPI</div>
            <div className="table-cellx12">File attached</div>           
            </div>


        </div>
    </div>
    </div>
    </>
  )
}

export default Purchase_Reports
