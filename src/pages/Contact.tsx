import { useState } from "react";
import { Link } from "react-router";
import MetaTags from "@/components/seo/MetaTags";
import { LocalBusinessSchema } from "@/components/seo/SchemaMarkup";
import {
  Phone, Mail, Globe, MessageCircle, Clock,
  Send, CheckCircle2,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", serviceInterest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <MetaTags
        title="İletişim | İkber Spor Yapıları | 0542 612 56 10"
        description="Spor sahası yapımı için bize ulaşın. Ücretsiz keşif ve fiyat teklifi. 30 yıllık tecrübe, MYK belgeli ekip. Hemen arayın!"
      />
      <LocalBusinessSchema />

      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span className="text-gray-400">/</span>
            <span className="text-white font-medium">İletişim</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">İletişim</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Spor sahası yapımı için bize ulaşın. Ücretsiz keşif ve fiyat teklifi alın.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-200">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Teşekkürler!</h2>
                  <p className="text-gray-600">Mesajınız alındı. En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                      <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">İlgilendiğiniz Hizmet</label>
                    <select value={formData.serviceInterest} onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                      <option value="">Seçiniz</option>
                      <option>Halı Saha Yapımı</option>
                      <option>Kapalı Halı Saha</option>
                      <option>Açık Halı Saha</option>
                      <option>Basketbol Sahası</option>
                      <option>Tenis Kortu</option>
                      <option>Voleybol Sahası</option>
                      <option>Çok Amaçlı Saha</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız *</label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                  </div>
                  <button type="submit" className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors w-full sm:w-auto">
                    <Send className="w-4 h-4" /> Gönder
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">İletişim Bilgileri</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Telefon</div>
                      <a href="tel:+905426125610" className="font-semibold text-gray-900 hover:text-green-600">0542 612 56 10</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">E-posta</div>
                      <a href="mailto:ikberspor@ikberspor.com" className="font-semibold text-gray-900 hover:text-green-600">ikberspor@ikberspor.com</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Web</div>
                      <a href="https://www.ikberspor.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:text-green-600">www.ikberspor.com</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Çalışma Saatleri</div>
                      <span className="font-semibold text-gray-900">Hafta içi 08:00 - 18:00</span>
                    </div>
                  </li>
                </ul>
              </div>

              <a href="https://wa.me/905426125610" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-400 transition-colors w-full">
                <MessageCircle className="w-5 h-5" /> WhatsApp'tan Yaz
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
