import React, { useState } from 'react'
import './Spa.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

function Spa() {
    const [formData, setFormData] = useState({
        spa_name: '',
        city: '',
        area: '',
        price: '',
        timing: '',
        images: []
    })
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevState) => ({
            ...prevState,
            images: files,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://20.193.149.47:2242/spas/vendor-spa-update-test/1/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                alert('Data added successfully')
            }else{
                throw new Error(`Error: ${response.status}`);
            } 
        } catch (error) {
            console.error("POST Error:", error);
            throw error;
        }
    };

    return (
        <div className='spa-main-container'>
            <div className='heading'>
                <h1>Trakky.in</h1>
            </div>
            <div className="content">
                <div className="left-section">
                    <form onSubmit={handleFormSubmit}>
                        <h3>Add Spa Form</h3>
                        <label>Spa Name</label>
                        <input type='text' value={formData.spa_name} onChange={(e) => setFormData({ ...formData, spa_name: e.target.value })} placeholder="Spa Name" />
                        <label>City</label>
                        <input type='text' value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="City" />
                        <label>Area</label>
                        <input type='text' value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder="Area" />
                        <label>Price</label>
                        <input type='number' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" />
                        <label>Timing</label>
                        <input type='time' value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Timing" />
                        <label>Images</label>
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="right-section">
                    <form >
                        <h3>Preview</h3>
                        <label>Spa Name</label>
                        <input type='text' value={formData.spa_name} disabled />
                        <label>City</label>
                        <input type='text' value={formData.city} disabled />
                        <label>Area</label>
                        <input type='text' value={formData.area} disabled />
                        <label>Price</label>
                        <input type='number' value={formData.price} disabled />
                        <label>Timing</label>
                        <input type='time' value={formData.timing} disabled />
                        <label>Images</label>
                        <div className="image-preview">
                            {formData.images.length <= 0 &&
                                <p>Images are not selected yet.</p>
                            }
                            {formData.images.length > 0 && (
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Pagination]}
                                >
                                    {formData.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Spa