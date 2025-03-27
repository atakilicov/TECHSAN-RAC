const User = require('../models/User');

// Mevcut controller metodları...

// Profil Güncelleme
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Auth middleware'den gelen kullanıcı ID'si
    
    // Güncellenebilecek alanlar
    const updatableFields = [
      'first_name', 
      'last_name', 
      'phone', 
      'address', 
      'city', 
      'birth_date'
    ];
    
    // Update için veri nesnesini hazırla
    const updateData = {};
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    
    // Kullanıcıyı güncelle
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: '-password' } // Güncel veriyi döndür, şifreyi hariç tut
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    
    // Güncellenmiş kullanıcı verilerini döndür
    res.status(200).json(updatedUser);
    
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({ error: 'Profil güncellenirken bir sorun oluştu. Lütfen tekrar deneyin.' });
  }
}; 