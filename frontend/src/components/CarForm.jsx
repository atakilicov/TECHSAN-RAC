import React from "react";

const CarForm = ({
  formData,
  formErrors,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
  modelOptions,
  options,
  popularBrands,
}) => (
  <form
    onSubmit={onSubmit}
    style={{
      background: "rgba(20,20,20,0.95)",
      color: "#fff",
      borderRadius: "12px",
      padding: "32px 28px",
      maxWidth: 480,
      margin: "40px auto",
      boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)",
      fontFamily: "Poppins, Segoe UI, sans-serif",
    }}
    autoComplete="off"
  >
    <h2 style={{ color: "#ec407a", marginBottom: 24, textAlign: "center" }}>
      Araç Bilgileri
    </h2>

    {/* Marka */}
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 500 }}>Marka*</label>
      <select
        name="brand"
        value={formData.brand}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          background: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "6px",
          marginTop: 4,
        }}
        required
      >
        <option value="">Marka Seçiniz</option>
        {popularBrands.map((b) => (
          <option key={b.value} value={b.value}>
            {b.value}
          </option>
        ))}
      </select>
      {formErrors.brand && (
        <div style={{ color: "#ff8a8a", fontSize: 13 }}>{formErrors.brand}</div>
      )}
    </div>

    {/* Model */}
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 500 }}>Model*</label>
      <select
        name="model"
        value={formData.model}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          background: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "6px",
          marginTop: 4,
        }}
        required
        disabled={!formData.brand}
      >
        <option value="">Model Seçiniz</option>
        {modelOptions.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
        <option value="Diğer">Diğer</option>
      </select>
      {formErrors.model && (
        <div style={{ color: "#ff8a8a", fontSize: 13 }}>{formErrors.model}</div>
      )}
    </div>

    {/* Yıl ve Plaka */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Yıl*</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={onChange}
          min="1990"
          max={new Date().getFullYear() + 1}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
          required
        />
        {formErrors.year && (
          <div style={{ color: "#ff8a8a", fontSize: 13 }}>{formErrors.year}</div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Plaka*</label>
        <input
          type="text"
          name="plate_number"
          value={formData.plate_number}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
          required
        />
        {formErrors.plate_number && (
          <div style={{ color: "#ff8a8a", fontSize: 13 }}>
            {formErrors.plate_number}
          </div>
        )}
      </div>
    </div>

    {/* Günlük Ücret */}
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 500 }}>Günlük Ücret (TL)*</label>
      <input
        type="number"
        name="daily_price"
        value={formData.daily_price}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          background: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "6px",
          marginTop: 4,
        }}
        required
      />
      {formErrors.daily_price && (
        <div style={{ color: "#ff8a8a", fontSize: 13 }}>
          {formErrors.daily_price}
        </div>
      )}
    </div>

    {/* Araç Türü, Yakıt, Şanzıman */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Araç Türü*</label>
        <select
          name="car_type"
          value={formData.car_type}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
          required
        >
          <option value="">Seçiniz</option>
          {options.car_types?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {formErrors.car_type && (
          <div style={{ color: "#ff8a8a", fontSize: 13 }}>
            {formErrors.car_type}
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Yakıt*</label>
        <select
          name="fuel_type"
          value={formData.fuel_type}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
          required
        >
          <option value="">Seçiniz</option>
          {options.fuel_types?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {formErrors.fuel_type && (
          <div style={{ color: "#ff8a8a", fontSize: 13 }}>
            {formErrors.fuel_type}
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Şanzıman*</label>
        <select
          name="transmission"
          value={formData.transmission}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
          required
        >
          <option value="">Seçiniz</option>
          {options.transmission_types?.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {formErrors.transmission && (
          <div style={{ color: "#ff8a8a", fontSize: 13 }}>
            {formErrors.transmission}
          </div>
        )}
      </div>
    </div>

    {/* Koltuk Sayısı ve Renk */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Koltuk</label>
        <input
          type="number"
          name="seat_count"
          value={formData.seat_count}
          onChange={onChange}
          min="1"
          max="20"
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ fontWeight: 500 }}>Renk</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            marginTop: 4,
          }}
        />
      </div>
    </div>

    {/* Görsel */}
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 500 }}>Araç Görseli</label>
      <input
        type="file"
        name="image"
        onChange={onChange}
        accept="image/*"
        style={{
          width: "100%",
          padding: "10px",
          background: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "6px",
          marginTop: 4,
        }}
      />
    </div>

    {/* Açıklama */}
    <div style={{ marginBottom: 24 }}>
      <label style={{ fontWeight: 500 }}>Açıklama</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          background: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "6px",
          minHeight: "70px",
          marginTop: 4,
        }}
      />
    </div>

    {/* Butonlar */}
    <div style={{ display: "flex", gap: 10 }}>
      <button
        type="button"
        onClick={onCancel}
        style={{
          flex: 1,
          padding: "12px",
          background: "#444",
          color: "#eee",
          border: "1px solid #666",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        İptal
      </button>
      <button
        type="submit"
        disabled={isLoading}
        style={{
          flex: 1,
          padding: "12px",
          background: "#ec407a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  </form>
);

export default CarForm; 