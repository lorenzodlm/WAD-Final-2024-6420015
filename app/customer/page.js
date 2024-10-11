"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
    const APIBASE = process.env.NEXT_PUBLIC_API_BASE;
    const { register, handleSubmit, reset } = useForm();
    const [customers, setCustomers] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const startEdit = (customer) => async () => {
        const formattedCustomer = {
            ...customer,
            dateOfBirth: customer.dateOfBirth ? customer.dateOfBirth.split('T')[0] : "",
            };
        
            setEditMode(true);
            reset(formattedCustomer);
    };

    async function fetchCustomers() {
        const data = await fetch(`${APIBASE}/customer`);
        const customers = await data.json();
        setCustomers(customers);
    }

    const createCustomerOrUpdate = async (data) => {
        if (editMode) {
        const response = await fetch(`${APIBASE}/customer`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            alert(`Failed to update customer: ${response.status}`);
        }
        alert("Customer updated successfully");
        reset({
            name: "",
            dateOfBirth: "",
            memberNumber: "",
            interests: "",
        });
        setEditMode(false);
        fetchCustomers();
        return;
        }

        const response = await fetch(`${APIBASE}/customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        try {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        alert("Customer added successfully");

        reset({
            name: "",
            dateOfBirth: "",
            memberNumber: "",
            interests: "",
        });
        fetchCustomers();
        } catch (error) {
        alert(`Failed to add customer: ${error.message}`);
        console.error(error);
        }
    };

    const deleteById = (id) => async () => {
        if (!confirm("Are you sure?")) return;

        const response = await fetch(`${APIBASE}/customer/${id}`, {
        method: "DELETE",
        });

        if (!response.ok) {
        alert(`Failed to delete customer: ${response.status}`);
        }
        alert("Customer deleted successfully");
        fetchCustomers();
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

return (
    <>
        <div className="flex flex-row gap-4">
            <div className="flex-1 w-64 ">
            <form onSubmit={handleSubmit(createCustomerOrUpdate)}>
                <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
                <div>Name:</div>
                <div>
                    <input
                    name="name"
                    type="text"
                    {...register("name", { required: true })}
                    className="border border-black w-full"
                    />
                </div>
                <div>Date of Birth:</div>
                <div>
                    <input
                    name="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth", { required: true })}
                    className="border border-black w-full"
                    />
                </div>
                <div>Member Number:</div>
                <div>
                    <input
                    name="memberNumber"
                    type="number"
                    {...register("memberNumber", { required: true })}
                    className="border border-black w-full"
                    />
                </div>
                <div>Interests:</div>
                <div>
                    <input
                    name="interests"
                    type="text"
                    {...register("interests", { required: false })}
                    className="border border-black w-full"
                    />
                </div>
                <div className="col-span-2">
                    {editMode ? (
                    <input
                        type="submit"
                        value="Update"
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    />
                    ) : (
                    <input
                        type="submit"
                        value="Add"
                        className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    />
                    )}
                    {editMode && (
                    <button
                        onClick={() => {
                        reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
                        setEditMode(false);
                        }}
                        className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Cancel
                    </button>
                    )}
                </div>
                </div>
            </form>
            </div>
            <div className="border m-4 bg-slate-300 flex-1 w-64">
            <h1 className="text-2xl">Customers ({customers.length})</h1>
            <ul className="list-disc ml-8">
                {customers.map((customer) => (
                <li key={customer._id}>
                    <button className="border border-black p-1/2" onClick={startEdit(customer)}>
                    📝
                    </button>{" "}
                    <button className="border border-black p-1/2" onClick={deleteById(customer._id)}>
                    ❌
                    </button>{" "}
                    <Link href={`/customer/${customer._id}`} className="font-bold">
                    {customer.name}
                    </Link>{" "}
                    - Member #{customer.memberNumber} - {customer.interests}
                </li>
                ))}
            </ul>
            </div>
        </div>
        </>
    );
}
