import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Trash2, Pencil, Plus, Save, RotateCcw } from 'lucide-react';
import InputControl from '../../../../../Components/InputComponents/InputController';

export default function InvoiceEwayDocket() {
  // Local state manages the temporary staging inputs for creation/editing
  const [invoiceNo, setInvoiceNo] = useState('');
  const [ewayBillNo, setEwayBillNo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const { control,trigger } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'eway_bills',
  });

  const resetInputs = () => {
    setInvoiceNo('');
    setEwayBillNo('');
    setEditIndex(null);
  };

  const handleAddOrUpdate = async() => {

    const isValid = await trigger([
      "temp_invoice_no",
      "temp_eway_bill_no"
    ]);
console.log(isValid)
    if (!isValid) return;

    const trimmedInvoice = invoiceNo.trim().toUpperCase();
    const trimmedEway = ewayBillNo.trim().toUpperCase();

    // Prevent submission of empty data
    if (!trimmedInvoice || !trimmedEway) return;

    if (editIndex !== null) {
      // Correctly update the RHF array at the exact index
      update(editIndex, {
        invoice_no: trimmedInvoice,
        eway_bill_no: trimmedEway,
      });
    } else {
      // Append a brand new record
      append({
        invoice_no: trimmedInvoice,
        eway_bill_no: trimmedEway,
      });
    }

    resetInputs();
  };

  const handleEdit = (index) => {
    const item = fields[index];
    setInvoiceNo(item.invoice_no);
    setEwayBillNo(item.eway_bill_no);
    setEditIndex(index);
  };

  return (
    <div className="w-full p-4">
      <div className="w-full rounded-2xl bg-slate-100 text-base font-medium text-slate-800 shadow-md overflow-hidden">

        {/* Header Banner */}
        <h2 className="bg-teal-700 py-3 px-5 text-lg font-semibold text-white tracking-wide">
          Invoice & E-way Bill Details
        </h2>

        {/* Input Staging Area */}
        <div className="flex flex-col sm:flex-row items-baseline gap-4 p-5 bg-[#CBD5E1] border-b border-slate-200">
          <div className="flex-1 w-full">
            <InputControl
              name="temp_invoice_no"
              label="Invoice No"
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value.toUpperCase())}
            />
          </div>

          <div className="flex-1 w-full">
            <InputControl
              name="temp_eway_bill_no"
              label="E-way Bill No"
              type="number"
              value={ewayBillNo}
              onChange={(e) => setEwayBillNo(e.target.value)}
            />
          </div>

          {/* Action Call-to-Actions (CTAs) */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className={`flex h-10 px-4 items-center justify-center gap-2 rounded-lg text-white font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${editIndex !== null
                  ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              title={editIndex !== null ? 'Update Entry' : 'Add Entry'}
            >
              {editIndex !== null ? (
                <>
                  <Save size={18} />
                  <span>Update</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Add</span>
                </>
              )}
            </button>

            {editIndex !== null && (
              <button
                type="button"
                onClick={resetInputs}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                title="Cancel Edit"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Records Grid */}
        {fields.length > 0 ? (
          <div className="p-5 bg-[#CBD5E1]">
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">

              {/* Table Header Row */}
              <div className="grid grid-cols-[60px_1fr_1fr_80px_80px] bg-slate-800 p-3.5 text-sm font-semibold text-slate-200 items-center text-left">
                <div>S.No.</div>
                <div>Invoice No</div>
                <div>E-Way Bill No</div>
                <div className="text-center">Edit</div>
                <div className="text-center">Delete</div>
              </div>

              {/* Table Data Rows */}
              <div className="divide-y divide-slate-200">
                {fields.map((item, index) => {
                  const isEditing = editIndex === index;

                  return (
                    <div
                      key={item.id} // Industry Standard: Using unique field array id instead of loop index
                      className={`grid grid-cols-[60px_1fr_1fr_80px_80px] items-center p-3.5 text-sm transition-colors ${isEditing ? 'bg-amber-50/70' : 'hover:bg-slate-50 bg-white'
                        }`}
                    >
                      <div className="font-semibold text-slate-400 pl-1">{index + 1}</div>
                      <div className="font-medium text-slate-700 truncate pr-2">{item.invoice_no}</div>
                      <div className="font-medium text-slate-700 truncate pr-2">{item.eway_bill_no}</div>

                      {/* Edit Row Action */}
                      <div className="flex justify-center">
                        <button
                          type="button"
                          disabled={isEditing}
                          onClick={() => handleEdit(index)}
                          className={`p-1.5 rounded-md transition-all ${isEditing
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'text-amber-600 hover:bg-amber-50 hover:text-amber-700'
                            }`}
                          title="Edit row"
                        >
                          <Pencil size={16} />
                        </button>
                      </div>

                      {/* Delete Row Action */}
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            remove(index);
                            if (isEditing) resetInputs();
                          }}
                          className="p-1.5 text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-all"
                          title="Delete row"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-black/100 bg-[#CBD5E1]">
            No record(s) added yet. Fill fields above to add entries.
          </div>
        )}
      </div>
    </div>
  );
}