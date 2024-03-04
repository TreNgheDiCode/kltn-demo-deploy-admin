import { db } from "@/lib/db";
import { PostSchema } from "@/types";
import { PostStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { studentCode: string } }
) {
  try {
    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 400 }
      );
    }

    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 404 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        studentCode: params.studentCode,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy học sinh" },
        { status: 404 }
      );
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Hồ sơ không tồn tại" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const validatedFields = PostSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Thông tin không hợp lệ" },
        { status: 400 }
      );
    }

    const data = validatedFields.data;

    if (!data.status) {
      data.status = PostStatus.PUBLIC;
    }

    const post = await db.post.create({
      data: {
        profileId: profile.id,
        ...data,
      },
      select: {
        id: true,
        images: true,
      },
    });

    if (!data.postImages) {
      return NextResponse.json(post, { status: 200 });
    } else {
      for (const image of data.postImages) {
        await db.postImage.create({
          data: {
            postId: post.id,
            url: image,
          },
        });
      }

      return NextResponse.json(post, { status: 200 });
    }
  } catch (error) {
    console.log("ERROR CREATE NEW POST", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Định dạng JSON không hợp lệ" },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi tạo bài đăng mới" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string } }
) {
  try {
    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 400 }
      );
    }

    if (!params.studentCode) {
      return NextResponse.json(
        { error: "Vui lòng truyền vào mã học sinh" },
        { status: 404 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        studentCode: params.studentCode,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy học sinh" },
        { status: 404 }
      );
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Hồ sơ không tồn tại" },
        { status: 404 }
      );
    }

    const posts = await db.post.findMany({
      where: {
        profileId: profile.id,
        isArchived: false,
      },
      include: {
        comments: {
          include: {
            image: true,
            children: {
              select: {
                id: true,
              },
            },
            likes: true,
          },
        },
        likes: true,
        images: true,
        saves: true,
        shares: true,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("ERROR GET POSTS BY STUDENT CODE", error);

    return NextResponse.json(
      { error: "Lỗi lấy thông tin bài đăng theo mã hồ sơ" },
      { status: 500 }
    );
  }
}
