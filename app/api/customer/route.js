import Customer from "@/models/Customer"; // Import the Customer model

// Handle GET - Fetch all customers
export async function GET() {
    try {
        const customers = await Customer.find();
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch customers", { status: 500 });
    }
}

// Handle POST - Add new customer
export async function POST(request) {
    try {
        const body = await request.json();
        const customer = new Customer(body);
        await customer.save();
        return new Response(JSON.stringify(customer), { status: 201 });
    } catch (error) {
        return new Response("Failed to add customer", { status: 500 });
    }
}

// Handle PUT - Update existing customer by ID
export async function PUT(request) {
    try {
        const body = await request.json();
        const { _id, ...updateData } = body;
        const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });

        if (!customer) {
        return new Response("Customer not found", { status: 404 });
        }
        return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
        return new Response("Failed to update customer", { status: 500 });
    }
}

// Handle PATCH - Partially update existing customer by ID
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { _id, ...updateData } = body;
        const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });

        if (!customer) {
        return new Response("Customer not found", { status: 404 });
        }
        return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
        return new Response("Failed to patch customer", { status: 500 });
    }
}
