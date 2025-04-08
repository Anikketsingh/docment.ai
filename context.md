# Docment.ai - App Flow & Architecture

## Overview
Docment.ai is a comprehensive legal document management and transaction platform that simplifies the creation, verification, and sharing of legal documents. This document outlines the detailed app flow and architecture.
Tech Stack:
Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

## 1. User Onboarding Flow

### Screens
1. **Splash Screen**
   - Branding + Animation
   - Tagline: "Legal Docs. Simplified."

2. **Authentication Screen**
   - Phone number input
   - OTP Verification (supabase/Auth API)

3. **Routing Logic**
   - New user → KYC Flow
   - Returning user → Dashboard

## 2. KYC Verification Flow

### Steps
1. **PAN Upload**
   - Upload image or manual PAN entry
   - OCR-based extraction
   - Backend PAN verification API

2. **Identity Confirmation**
   - Optional selfie upload
   - Name & PAN details matching
   - Data processing consent

3. **DocmentID Generation**
   - Unique alphanumeric ID (e.g., DMNT5678)
   - Stored Information:
     - Full name
     - PAN details
     - Selfie (optional)
     - Mobile number
     - Verification date
     - DocmentID

4. **Database Structure**
```json
{
  "DocmentID": "DMNT5678",
  "name": "John Doe",
  "panNumber": "ABCDE1234F",
  "phone": "+91xxxxxxxxxx",
  "kycStatus": "Verified",
  "kycDate": "2025-04-04",
  "documents": []
}
```

## 3. Home Dashboard

### Core Features
- 📝 Generate New Document
- 📄 My Documents
- 🤝 P2P Legal Transactions

## 4. Document Generation

### Document Types
- Affidavit
- Power of Attorney
- Self-declaration
- NDAs
- Custom Document Builder

### Input Requirements
- Auto-filled user details from DocmentID
- Document-specific required fields
- eStamp integration
- eSignature capability
- Geotag + Timestamp
- Payment processing

## 5. P2P Legal Transaction Flow

### Process
1. Receiver's DocmentID input
2. Transaction Type Selection:
   - Rental Agreement
   - Sale Deed
   - Loan Agreement
   - Money Transfer
   - Phone Sale (IMEI input)
   - Custom Contract
3. Dynamic Form Generation
4. Party Notification
5. Two-Sided Agreement Process

## 6. Notification System

### Implementation
- supabase Cloud Messaging 
- Notification Triggers:
  - KYC verification
  - New P2P document
  - Signature requests
  - Document completion

## 7. Profile Management

### Features
- Personal Information (editable)
- KYC Status
- DocmentID Display
- Document History
- Account Settings

## 8. Security Implementation

### Measures
- AES 256-bit document encryption
- Trusted eSign providers (Digio, ZoopSign)
- Timestamp + Location metadata
- IT Act compliance
- Optional Aadhaar integration

## 9. Payment Integration

### Features
- Per-document pricing
- Payment Gateways:
  - Razorpay
  - Stripe
  - PhonePe
- Subscription/bundle discounts

## 10. Document Vault

### Capabilities
- Cloud storage for finalized documents
- Document management:
  - View
  - Download
  - Share
  - Filter by type/date/party

## 11. Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  docment_id VARCHAR(10) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  pan_number VARCHAR(10) UNIQUE NOT NULL,
  kyc_status VARCHAR(20) DEFAULT 'pending',
  kyc_date TIMESTAMP,
  selfie_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Documents Table
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  document_type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  is_estamped BOOLEAN DEFAULT false,
  is_signed BOOLEAN DEFAULT false,
  geolocation JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  document_id UUID REFERENCES documents(id),
  transaction_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Signatures Table
```sql
CREATE TABLE signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id),
  user_id UUID REFERENCES users(id),
  signature_url TEXT NOT NULL,
  signed_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  geolocation JSONB
);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  document_id UUID REFERENCES documents(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(20) DEFAULT 'pending',
  payment_gateway VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```


