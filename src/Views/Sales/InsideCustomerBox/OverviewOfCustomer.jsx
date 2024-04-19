import React from 'react'

const OverviewOfCustomer = ({user}) => {
  return (
    <>
              <div id='overviewofcustomers'> 
              <div className="insideitedowxls">
                <p>first_name</p>
                <span>{user && user.first_name}</span>
              </div>
              <div className="insideitedowxls">
                <p>last_name</p>
                <span>{user && user.last_name}</span>
              </div>
              <div className="insideitedowxls">
                <p>salutation</p>
                <span>{user && user.salutation}</span>
              </div>
              <div className="insideitedowxls">
                <p>name</p> 
                <span>{user && user.name}</span>
              </div>
              <div className="insideitedowxls">
                <p>email</p>
                <span>{user && user.email}</span>
              </div>
              <div className="insideitedowxls">
                <p>mobile_no</p>
                <span>{user && user.mobile_no}</span>
              </div>
              <div className="insideitedowxls">
                <p>work_phone</p>
                <span>{user && user.work_phone}</span>
              </div>
              <div className="insideitedowxls">
                <p>primary_organisation</p>
                <span>{user && user.primary_organisation}</span>
              </div>
              <div className="insideitedowxls">
                <p>active_organisation</p>
                <span>{user && user.active_organisation}</span>
              </div>
              <div className="insideitedowxls">
                <p>is_disabled</p>
                <span>{user && user.is_disabled}</span>
              </div>
              <div className="insideitedowxls">
                <p>email_verified_at</p>
                <span>{user && user.email_verified_at}</span>
              </div>
              <div className="insideitedowxls">
                <p>c_password</p>
                <span>{user && user.c_password}</span>
              </div>
              <div className="insideitedowxls">
                <p>organisation_id</p>
                <span>{user && user.organisation_id}</span>
              </div>
              <div className="insideitedowxls">
                <p>created_at</p>
                <span>{user && user.created_at}</span>
              </div>
              <div className="insideitedowxls">
                <p>updated_at</p>
                <span>{user && user.updated_at}</span>
              </div>
              <div className="insideitedowxls">
                <p>is_email_verified</p>
                <span>{user && user.is_email_verified}</span>
              </div>
              <div className="insideitedowxls">
                <p>email_token</p>
                <span>{user && user.email_token}</span>
              </div>
              <div className="insideitedowxls">
                <p>enteredbyid</p>
                <span>{user && user.enteredbyid}</span>
              </div>
              <div className="insideitedowxls">
                <p>is_vendor</p>
                <span>{user && user.is_vendor}</span>
              </div>
              <div className="insideitedowxls">
                <p>is_customer</p>
                <span>{user && user.is_customer}</span>
              </div>
              <div className="insideitedowxls">
                <p>customer_type</p>
                <span>{user && user.customer_type}</span>
              </div>
              <div className="insideitedowxls">
                <p>company_name</p>
                <span>{user && user.company_name}</span>
              </div>
              <div className="insideitedowxls">
                <p>display_name</p>
                <span>{user && user.display_name}</span>
              </div>
              <div className="insideitedowxls">
                <p>pan_no</p>
                <span>{user && user.pan_no}</span>
              </div>
              <div className="insideitedowxls">
                <p>payment_terms</p>
                <span>{user && user.payment_terms}</span>
              </div>
              <div className="insideitedowxls">
                <p>gst_no</p>
                <span>{user && user.gst_no}</span>
              </div>
              <div className="insideitedowxls">
                <p>place_of_supply</p>
                <span>{user && user.place_of_supply}</span>
              </div>
              <div className="insideitedowxls">
                <p>tax_preference</p>
                <span>{user && user.tax_preference}</span>
              </div>
              <div className="insideitedowxls">
                <p>currency</p>
                <span>{user && user.currency}</span>
              </div>
              <div className="insideitedowxls">
                <p>remarks</p>
                <span>{user && user.remarks}</span>
              </div>
              <div className="insideitedowxls">
                <p>address</p>
                <span>{user && JSON.stringify(user.address)}</span>
              </div>
              <div className="insideitedowxls">
                <p>contact_person</p>
                <span>{user && JSON.stringify(user.contact_person)}</span>
              </div>
            </div>
    </>
  )
}

export default OverviewOfCustomer

























// import React from 'react'

// const OverviewOfCustomer = ({user}) => {
//   return (
//     <>
//               <div id='overviewofcustomers'> 
//               <div className="insideitedowxls">
//                 <p>id</p>
//                 <span>{user && user.id}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>first_name</p>
//                 <span>{user && user.first_name}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>last_name</p>
//                 <span>{user && user.last_name}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>salutation</p>
//                 <span>{user && user.salutation}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>name</p>
//                 <span>{user && user.name}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>email</p>
//                 <span>{user && user.email}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>mobile_no</p>
//                 <span>{user && user.mobile_no}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>work_phone</p>
//                 <span>{user && user.work_phone}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>primary_organisation</p>
//                 <span>{user && user.primary_organisation}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>active_organisation</p>
//                 <span>{user && user.active_organisation}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>is_disabled</p>
//                 <span>{user && user.is_disabled}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>email_verified_at</p>
//                 <span>{user && user.email_verified_at}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>c_password</p>
//                 <span>{user && user.c_password}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>organisation_id</p>
//                 <span>{user && user.organisation_id}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>created_at</p>
//                 <span>{user && user.created_at}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>updated_at</p>
//                 <span>{user && user.updated_at}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>is_email_verified</p>
//                 <span>{user && user.is_email_verified}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>email_token</p>
//                 <span>{user && user.email_token}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>enteredbyid</p>
//                 <span>{user && user.enteredbyid}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>is_vendor</p>
//                 <span>{user && user.is_vendor}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>is_customer</p>
//                 <span>{user && user.is_customer}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>customer_type</p>
//                 <span>{user && user.customer_type}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>company_name</p>
//                 <span>{user && user.company_name}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>display_name</p>
//                 <span>{user && user.display_name}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>pan_no</p>
//                 <span>{user && user.pan_no}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>payment_terms</p>
//                 <span>{user && user.payment_terms}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>gst_no</p>
//                 <span>{user && user.gst_no}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>place_of_supply</p>
//                 <span>{user && user.place_of_supply}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>tax_preference</p>
//                 <span>{user && user.tax_preference}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>currency</p>
//                 <span>{user && user.currency}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>remarks</p>
//                 <span>{user && user.remarks}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>address</p>
//                 <span>{user && JSON.stringify(user.address)}</span>
//               </div>
//               <div className="insideitedowxls">
//                 <p>contact_person</p>
//                 <span>{user && JSON.stringify(user.contact_person)}</span>
//               </div>
//             </div>
//     </>
//   )
// }

// export default OverviewOfCustomer
