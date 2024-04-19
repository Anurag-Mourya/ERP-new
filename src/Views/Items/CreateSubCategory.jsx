import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { createSubCategories } from '../../Redux/Actions/categoriesActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateSubCategory = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state?.createSubCategory);

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        subcategoryName: '',
        subcategoryDescription: '',
        subcategoryTitle: '',
        subcategoryParent: '2'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmitSubcategory = async (e) => {
        e.preventDefault();
        try {
            const sendData = {
                name: formData.subcategoryName,
                description: formData.subcategoryDescription,
                title: formData.subcategoryTitle,
                parent_id: formData.subcategoryParent
            };

            dispatch(createSubCategories(sendData));
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('An error occurred while creating category');
        }
    };

    // Use useEffect to handle API response outside of handleSubmitCategory
    useEffect(() => {
        if (data?.data?.success === true) {
            toast.success(data?.data?.message);
        } else if (data?.data?.success === false) {
            toast.error(data?.data?.message);
        }
    }, [data]);

    return (
        <div id="secondform">

            <h2 id='firstheading'>Create Subcategory</h2>
            <br />
            <form onSubmit={handleSubmitSubcategory}>
                <div id="formofcreateupdateorg">
                    <div id="fforcklls12">
                        <div className="form-group">
                            <label>Subcategory Name:</label>
                            <input type="text" name="subcategoryName" value={formData.subcategoryName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" name="subcategoryTitle" value={formData.subcategoryTitle} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="subcategoryDescription" value={formData.subcategoryDescription} onChange={handleChange} rows="4" />
                    </div>
                    <div className="form-group">
                        <label>Parent Category:</label>
                        <select name="subcategoryParent" value={formData.subcategoryParent} onChange={handleChange}>
                            <option value="">Select Parent Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {/* {category.name} */}
                                    parent name
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button id='herobtnskls' type="submit">Create Subcategory</button>
            </form>
            <Toaster />
        </div>
    )
}

export default CreateSubCategory;