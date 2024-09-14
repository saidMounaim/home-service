export interface BusinessProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  fullName: string;
  contactPerson: string;
  email: string;
  category: string;
  createdAt: Date;
}

export interface appointmentDataProps {
  date: Date;
  timeSlot: string;
  note?: string;
  businessId: string;
}
