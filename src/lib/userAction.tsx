import User from "@/models/userModels";
import connectToDatabase from "@/app/dbconfig/dbconfig";

export const getUsers = async ({
    page = 1,
    limit = 10,
    search
}: {
    page?: number;
    limit?: number;
    search?: string;
}) => {
    await connectToDatabase();

    // Create filter object for MongoDB query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    // Add search filter if provided
    if (search) {
        filter.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } }
        ];
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Query MongoDB for the filtered data
    const users = await User.find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

    // Convert Mongoose documents to plain JavaScript objects
    const plainUsers = users.map(user => user.toObject());

    // Get the total count of matched users
    const totalUsers = await User.countDocuments(filter);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
        success: true,
        time: currentTime,
        message: 'Sample data for testing and learning purposes',
        total_users: totalUsers,
        offset,
        limit,
        users: plainUsers, // Use plainUsers to ensure only plain objects are returned
    };
};
