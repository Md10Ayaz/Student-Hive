import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  CreditCard,
  CheckCircle2,
  Download,
  AlertCircle,
  Receipt,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function StudentFees() {
  const { fees, payFee } = useData();
  const [showPayModal, setShowPayModal] = useState(false);
  const [amountToPay, setAmountToPay] = useState(fees.tuitionRemaining || 15000);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [lastReceipt, setLastReceipt] = useState(null);

  const handlePayment = (e) => {
    e.preventDefault();
    if (amountToPay <= 0) return;
    const receiptNo = payFee(amountToPay, 'Semester 5 Tuition Fee (Balance Clearance)', paymentMode);
    setLastReceipt(receiptNo);
    setShowPayModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Tuition & Campus Dues</h1>
          <p style={{ fontSize: '0.85rem' }}>View academic fee structures, installment ledgers, and official digital receipts.</p>
        </div>
        {fees.tuitionRemaining > 0 ? (
          <button onClick={() => setShowPayModal(true)} className="btn btn-primary">
            <CreditCard size={16} /> Pay Outstanding Dues
          </button>
        ) : (
          <span className="badge badge-success" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
            ✓ All Academic Dues Cleared
          </span>
        )}
      </div>

      {lastReceipt && (
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: '14px',
            background: 'var(--color-success-bg)',
            border: '1px solid var(--color-success)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '2px' }}>
              ✓ Payment Received Successfully!
            </h4>
            <p style={{ fontSize: '0.82rem' }}>Official Transaction Receipt ID: <strong>{lastReceipt}</strong></p>
          </div>
          <button
            onClick={() => alert(`Generated Official PDF receipt for ${lastReceipt}`)}
            className="btn btn-sm btn-secondary"
          >
            <Download size={14} /> Download Receipt
          </button>
        </div>
      )}

      {/* PRD Section 17 Highlight Card */}
      <div
        className="glass-panel"
        style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--dept-cse)', textTransform: 'uppercase' }}>
          Semester 5 Fee Ledger
        </span>
        <h2 style={{ fontSize: '1.4rem', marginTop: '2px', marginBottom: '1.25rem' }}>Tuition & Laboratory Charges</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Tuition Fee</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '2px' }}>
              ₹{fees.tuitionTotal.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-success)' }}>Total Amount Paid</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-success)', marginTop: '2px' }}>
              ₹{fees.tuitionPaid.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--color-warning)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-warning)' }}>Balance Remaining</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-warning)', marginTop: '2px' }}>
              ₹{fees.tuitionRemaining.toLocaleString()}
            </div>
          </div>
        </div>

        {fees.tuitionRemaining > 0 && (
          <button
            onClick={() => setShowPayModal(true)}
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.5rem' }}
          >
            <CreditCard size={18} /> Pay Fees Online (₹{fees.tuitionRemaining.toLocaleString()})
          </button>
        )}
      </div>

      {/* Payment History Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Transaction History & Official Receipts</h3>

        <div className="table-container">
          <table className="hive-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Date</th>
                <th>Category</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.paymentsHistory.map((item) => (
                <tr key={item.receiptNo}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{item.receiptNo}</td>
                  <td>{item.date}</td>
                  <td style={{ fontWeight: 600 }}>{item.category}</td>
                  <td>{item.mode}</td>
                  <td style={{ fontWeight: 800, color: 'var(--color-success)' }}>₹{item.amount.toLocaleString()}</td>
                  <td><span className="badge badge-success">{item.status}</span></td>
                  <td>
                    <button
                      onClick={() => alert(`Downloading PDF copy of receipt ${item.receiptNo}`)}
                      className="btn btn-ghost btn-sm"
                      title="Download receipt copy"
                    >
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Fees Modal */}
      {showPayModal && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>College Online Fee Payment Gateway</h3>
              <button onClick={() => setShowPayModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handlePayment}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Amount to Pay (INR)</label>
                  <input
                    type="number"
                    required
                    min={500}
                    max={fees.tuitionRemaining}
                    value={amountToPay}
                    onChange={(e) => setAmountToPay(Number(e.target.value))}
                    className="form-input"
                    style={{ fontSize: '1.2rem', fontWeight: 700 }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '6px' }}>
                    {['UPI', 'NetBanking', 'Credit / Debit Card'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPaymentMode(mode)}
                        className={`btn btn-sm ${paymentMode === mode ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={16} color="var(--dept-cse)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  Secure 256-bit encrypted simulation. In production, this handshakes with an official payment gateway (Razorpay / Stripe) via Cloud Functions.
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowPayModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Payment of ₹{Number(amountToPay).toLocaleString()}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
