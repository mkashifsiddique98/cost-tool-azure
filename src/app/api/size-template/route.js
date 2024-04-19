import connectDB from "@/utils/connectDB";
import SizeTemplate from "@/models/sizeTemplate";
connectDB();
export async function GET(request) {
  try {
    const listSizeTemplate = await SizeTemplate.find();
    return Response.json(listSizeTemplate, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const res = await request.json();
    const newSizeTemplate = new SizeTemplate(res);
    const savedSizeTemplate = await newSizeTemplate.save();
    return Response.json({ response: savedSizeTemplate }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const res = await request.json();
    const { id } = res;
    console.log(id);
    const listSizeTemplate = await SizeTemplate.findByIdAndDelete(id);
    return Response.json(listSizeTemplate, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
