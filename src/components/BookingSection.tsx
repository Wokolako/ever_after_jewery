import React, { useState } from 'react';
import { CONSULTATION_SERVICES } from '../data/content';
import { ConsultationService, BookingAppointment } from '../types';
import { Calendar, Clock, MapPin, CheckCircle2, User, Building, Mail, Phone, MessageSquare, ArrowRight, Shield } from 'lucide-react';

interface BookingSectionProps {
  onBookingComplete?: (booking: BookingAppointment) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onBookingComplete }) => {
  const [selectedService, setSelectedService] = useState<ConsultationService>(CONSULTATION_SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-18');
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM BST');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingAppointment | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    specificInquiry: '',
  });

  const availableDates = [
    { date: '2026-09-18', display: 'Fri, Sep 18' },
    { date: '2026-09-21', display: 'Mon, Sep 21' },
    { date: '2026-09-22', display: 'Tue, Sep 22' },
    { date: '2026-09-23', display: 'Wed, Sep 23' },
    { date: '2026-09-24', display: 'Thu, Sep 24' },
    { date: '2026-09-25', display: 'Fri, Sep 25' },
  ];

  const availableTimes = [
    '10:00 AM BST',
    '11:30 AM BST',
    '02:00 PM BST',
    '03:30 PM BST',
    '05:00 PM BST',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email) return;

    const refNum = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const appointment: BookingAppointment = {
      id: `apt-${Date.now()}`,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      date: selectedDate,
      time: selectedTime,
      clientName: formData.clientName,
      companyName: formData.companyName || 'Independent Atelier',
      email: formData.email,
      phone: formData.phone || 'N/A',
      specificInquiry: formData.specificInquiry,
      status: 'Confirmed',
      referenceNumber: refNum,
    };

    setConfirmedBooking(appointment);
    if (onBookingComplete) {
      onBookingComplete(appointment);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C827A] font-semibold">
            Bespoke Services &amp; Consultations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
            Private Gemological Appointments
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Schedule a private viewing in our London or Geneva vault suites, or request a digital macro-appraisal session for custom jewelry commissions.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-[#FFFFFF] border border-[#E8E1D9] rounded-xl p-8 sm:p-10 shadow-lg text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-[#FAF8F5] border border-[#C5A880] text-[#1A1918] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#C5A880]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A]">
                Appointment Confirmed
              </span>
              <h2 className="font-serif text-3xl text-[#1A1918]">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-[#78716C]">
                Official Reference: <span className="font-mono font-bold text-[#1A1918]">{confirmedBooking.referenceNumber}</span>
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E8E1D9] text-left space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E8E1D9]">
                <span className="text-[#8C827A]">Service:</span>
                <span className="font-semibold text-[#1A1918] text-right">{confirmedBooking.serviceTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E1D9]">
                <span className="text-[#8C827A]">Date &amp; Time:</span>
                <span className="font-semibold text-[#1A1918]">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E1D9]">
                <span className="text-[#8C827A]">Attendee:</span>
                <span className="font-semibold text-[#1A1918]">{confirmedBooking.clientName} ({confirmedBooking.companyName})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8C827A]">Confirmation Sent:</span>
                <span className="font-semibold text-[#1A1918]">{confirmedBooking.email}</span>
              </div>
            </div>

            <div className="text-xs text-[#78716C] font-light">
              A private gemological specialist has been assigned to prepare your parcel requests. For immediate changes, reach our desk directly at <span className="text-[#1A1918] font-medium">consult@yosenamora.com</span>.
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-8 py-3 bg-[#1A1918] text-[#FAF8F5] rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#33312E] transition-colors cursor-pointer"
            >
              Book Another Consultation
            </button>
          </div>
        ) : (
          /* Interactive Booking Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Step 1: Select Consultation Service */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1918] pb-2 border-b border-[#E8E1D9] flex items-center gap-2">
                <span>01. Select Consultation Tier</span>
              </h3>

              <div className="space-y-3">
                {CONSULTATION_SERVICES.map((service) => {
                  const isSelected = selectedService.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#1A1918] shadow-md ring-1 ring-[#1A1918]'
                          : 'bg-[#FFFFFF] border-[#E8E1D9] hover:border-[#C5A880]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#FAF8F5] border border-[#E5DFD7] text-[#1A1918]">
                          {service.type}
                        </span>
                        <span className="text-xs text-[#78716C] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg text-[#1A1918] mb-1">
                        {service.title}
                      </h4>

                      <p className="text-xs text-[#57534E] font-light leading-relaxed mb-3">
                        {service.description}
                      </p>

                      <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-[11px]">
                        <span className="text-[#8C827A]">Fee:</span>
                        <span className="font-semibold text-[#1A1918]">{service.fee}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E8E1D9] text-xs text-[#57534E] flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <p className="font-light">
                  All appointments include bilateral Non-Disclosure protection. Your client designs and CAD files remain 100% confidential.
                </p>
              </div>
            </div>

            {/* Step 2: Calendar & Timeslot Picker */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1918] pb-2 border-b border-[#E8E1D9] flex items-center gap-2">
                <span>02. Select Date &amp; Time Slot</span>
              </h3>

              {/* Date selection grid */}
              <div className="bg-[#FFFFFF] p-5 rounded-lg border border-[#E8E1D9] space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#8C827A] block">
                  Available Dates (Next 14 Days)
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  {availableDates.map((item) => (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`p-3 rounded text-left border transition-all cursor-pointer ${
                        selectedDate === item.date
                          ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5] shadow-sm'
                          : 'border-[#E8E1D9] bg-[#FAF8F5] text-[#1A1918] hover:border-[#1A1918]'
                      }`}
                    >
                      <span className="block text-xs font-semibold">{item.display}</span>
                      <span className={`text-[10px] ${selectedDate === item.date ? 'text-[#C5A880]' : 'text-[#78716C]'}`}>
                        Vault Open
                      </span>
                    </button>
                  ))}
                </div>

                {/* Timeslots */}
                <div className="pt-4 border-t border-[#F2ECE4] space-y-2">
                  <span className="text-xs uppercase tracking-wider text-[#8C827A] block">
                    Select Convenient Time Slot
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2.5 rounded text-xs text-left border flex items-center justify-between transition-all cursor-pointer ${
                          selectedTime === time
                            ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#1A1918] font-bold'
                            : 'border-[#E8E1D9] bg-[#FFFFFF] text-[#57534E] hover:border-[#1A1918]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#8C827A]" /> {time}
                        </span>
                        {selectedTime === time && (
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-[#78716C] italic pt-2">
                  Note: Vault viewing locations available in Hatton Garden (London) and Rue du Rhône (Genève).
                </div>
              </div>
            </div>

            {/* Step 3: Booking Form */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1918] pb-2 border-b border-[#E8E1D9] flex items-center gap-2">
                <span>03. Jeweller Credentials &amp; Request</span>
              </h3>

              <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E8E1D9] space-y-4 shadow-sm">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#78716C] mb-1">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Master Jeweller Arthur Sterling"
                      className="w-full bg-[#FAF8F5] border border-[#E0D8CE] rounded pl-9 pr-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#1A1918]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#78716C] mb-1">
                    Atelier / Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Sterling Fine Jewels Ltd"
                      className="w-full bg-[#FAF8F5] border border-[#E0D8CE] rounded pl-9 pr-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#1A1918]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#78716C] mb-1">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jeweller@atelier.com"
                      className="w-full bg-[#FAF8F5] border border-[#E0D8CE] rounded pl-9 pr-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#1A1918]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#78716C] mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 20 7946 0912"
                      className="w-full bg-[#FAF8F5] border border-[#E0D8CE] rounded pl-9 pr-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#1A1918]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#78716C] mb-1">
                    Specific Stones or Parcel Parameters
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specificInquiry}
                    onChange={(e) => setFormData({ ...formData, specificInquiry: e.target.value })}
                    placeholder="e.g. Seeking matching 5ct+ unheated Ceylon cushion pair, or inspecting the 14ct Type IIa diamond..."
                    className="w-full bg-[#FAF8F5] border border-[#E0D8CE] rounded p-2.5 text-xs text-[#1A1918] focus:outline-none focus:border-[#1A1918]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1A1918] text-[#FAF8F5] hover:bg-[#33312E] rounded text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Confirm Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
