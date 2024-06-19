import React from 'react'
import { otherIcons } from '../../../Helper/SVGIcons/ItemsIcons/Icons';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

const Cash_flow_statment = () => {
  return (
    <>
    <div className="maindivofreporstx5w633">
    <div className="reportbarinsx5w">
        <h1>Cash flow statement</h1>
        <div className="rightfiltex4w">
            <div className="xw15sf5w5s6">{otherIcons?.print_svg}Print</div>
            <div className="xw15sf5w5s6">{otherIcons?.export_svg}Export as PDF</div>
            <Link className="crossicox45wsx2w3" to={"/dashboard/reports"}>
            <RxCross2 />
          </Link>
        </div>
      </div>

      <div className="xklwefs5d456s">
        <div className="xjlokw5456w">
            <p>Basis: Accrual</p>
            <h4>From 01 Dec 2021 To 31 Dec 2021</h4>
        </div>

        <div className="ch2xjlokw5456w">
            <div className="x45wx5w activexkl5w2">Collapse all</div>
            <div className="x45wx5w">Expand all</div>
        </div>

        
        <div className="ch2xjlokw5456wx321">
            <div className="tex5w6x6ws xkwls2z2">{otherIcons?.print_svg}ACCOUNT</div>
            <div className="tex5w6x6ws xkwls2z3">{otherIcons?.print_svg}TOTAL</div>
        </div>


        <div className="sdf6w6xchofx32w6">
            <div className="rex47w65e546">
                <div className="xw74e56sd65">
                    <div className="x45we55fd4s5d xkwls2z2">Beginning Cash Balance</div>
                    <div className="xw445s5ds xkwls2z3">0,00</div>
                </div>
                <div className="xw74e56sd65">
                    <div className="x45we55fd4s5d xkwls2z2">Cash Flow from Operating Activities</div>
                    <div className="xw445s5ds xkwls2z3">0,00</div>
                </div>
            </div>

            <div className="childxkwjlks5456s">
            <div className="xkw48x4s5s6x1 xkwls2z2">
                <span>Account payable</span>
                <span>Account payable</span>
                <span>Input CGST</span>
                <span>Input IGST</span>
            </div>
            <div className="xkw48x4s5s6x1 xkwls2z3">
                <span>0,00</span>
                <span>0,00</span>
                <span>0,00</span>
                <span>0,00</span>
            </div>
            {/* <div className="xkw48x4s5s6x1 xkwls2z3">
                <span>0,00</span>
                <span>0,00</span>
                <span>0,00</span>
                <span>0,00</span>
            </div> */}
            </div>
            
            <div className="xkwjlks5456s">
                <p className="xkwls2z1">Total for Input Tax Credits</p>
                {/* <p className="xkwls2z2">2301,76</p>
                <p className="xkwls2z3">2301,76</p> */}
            </div>
        </div>


        <div className="sdf6w6xchofx32w6">
       
            <div className="childxkwjlks5456s">
            <div className="xkw48x4s5s6x1 xkwls2z2">
                <span>Net Income </span>
            </div>
           
            <div className="xkw48x4s5s6x1 xkwls2z3">
                <span>0,00</span>
            </div>
            </div>
            
            <div className="xkwjlks5456s">
                <p className="xkwls2z2">Net cash provided by Operating Activities</p>
                <p className="xkwls2z3">2301,76</p>
            </div>
        </div>



        <div className="sdf6w6xchofx32w6">

        <div className="xw74e56sd65x4556we">
                <p className="xkwls2z2">Cash Flow from Investing Activities</p>
                {/* <p className="xkwls2z3">2301,76</p> */}
            </div>
            
            <div className="xkwjlks5456s">
                <p className="xkwls2z2">Cash Flow from Investing Activities</p>
                <p className="xkwls2z3">2301,76</p>
            </div>
        </div>
       
            



        <div className="sdf6w6xchofx32w6">

        <div className="xw74e56sd65x4556we">
                <p className="xkwls2z2">Cash Flow from Financing Activities</p>
                {/* <p className="xkwls2z3">2301,76</p> */}
            </div>
            
            <div className="xkwjlks5456s">
                <p className="xkwls2z2">Net cash provided by Investing Activities</p>
                <p className="xkwls2z3">2301,76</p>
            </div>
            <div className="xkwjlks5456s xw74e56sd65x4556we">
                <p className="xkwls2z2"></p>
                <p className="xkwls2z3">Net change in cash: 2301,76</p>
            </div>
            <div className="xkwjlks5456s xw74e56sd65x4556we">
                <p className="xkwls2z2"></p>
                <p className="xkwls2z3">Ending cash balance: 2301,76</p>
            </div>
        </div>
       
            




      



      </div>
    </div>
    </>
  )
}

export default Cash_flow_statment
