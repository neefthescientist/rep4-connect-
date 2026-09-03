import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/students - Retrieve all student records
export async function GET() {
  try {
    const result = await query(
      `SELECT 
        id, 
        first_name AS "firstName", 
        last_name AS "lastName", 
        email, 
        school, 
        education_level AS "educationLevel", 
        grad_year AS "gradYear", 
        cohort, 
        status, 
        interests, 
        created_at AS "createdAt"
       FROM students 
       ORDER BY created_at DESC`
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    console.error('Database fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student records' },
      { status: 500 }
    );
  }
}

// POST /api/students - Create a new student record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      school,
      educationLevel,
      gradYear,
      cohort,
      interests,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !school) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO students 
        (first_name, last_name, email, school, education_level, grad_year, cohort, interests)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, first_name AS "firstName", last_name AS "lastName", email`,
      [
        firstName,
        lastName,
        email,
        school,
        educationLevel || 'High School',
        gradYear || 2027,
        cohort || 2026,
        interests ? interests.split(',').map((s: string) => s.trim()) : [],
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Database insert error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create student record' },
      { status: 500 }
    );
  }
}