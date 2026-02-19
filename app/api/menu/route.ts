import { NextResponse } from 'next/server';
import { menuConfig, filterMenuByRole } from '@/data/menu-config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');

  if (!role) {
    return NextResponse.json(
      { error: 'Role parameter is required' },
      { status: 400 }
    );
  }

  const filteredMenu = filterMenuByRole(menuConfig, role);

  return NextResponse.json({ menu: filteredMenu });
}
