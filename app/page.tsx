'use client';

import { useState, useEffect } from 'react';

const COURSES = [
  {
    id: 1,
    title: 'AI 기초 입문',
    desc: 'AI가 무엇인지, 어떻게 활용하는지 첫걸음을 배웁니다.',
    youtube: 'https://www.youtube.com/embed/aircAruvnKk',
    likes: 0,
  },
  {
    id: 2,
    title: 'ChatGPT 활용법',
    desc: 'ChatGPT를 업무에 바로 쓸 수 있는 실전 프롬프트를 배웁니다.',
    youtube: 'https://www.youtube.com/embed/JTxsNm9IdYU',
    likes: 0,
  },
  {
    id: 3,
    title: '이미지 생성 AI',
    desc: 'Midjourney·DALL-E로 아이디어를 이미지로 만드는 방법을 배웁니다.',
    youtube: 'https://www.youtube.com/embed/SVcsDDABEkM',
    likes: 0,
  },
  {
    id: 4,
    title: 'AI 코딩 입문',
    desc: 'Claude Code·Cursor로 코딩 경험 없이 앱을 만드는 법을 배웁니다.',
    youtube: 'https://www.youtube.com/embed/zduSFxRajkE',
    likes: 0,
  },
  {
    id: 5,
    title: '업무 자동화 RPA',
    desc: 'AI로 반복 업무를 자동화해 시간을 아끼는 방법을 배웁니다.',
    youtube: 'https://www.youtube.com/embed/9bZkp7q19f0',
    likes: 0,
  },
  {
    id: 6,
    title: '데이터 분석 AI',
    desc: 'AI를 활용해 엑셀·데이터를 빠르게 분석하는 법을 배웁니다.',
    youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    likes: 0,
  },
];

type Tab = '홈' | '강의' | '게시판';
type ViewMode = 'grid' | 'list';

interface Post {
  id: number;
  text: string;
  date: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('홈');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [likes, setLikes] = useState<Record<number, number>>(() =>
    Object.fromEntries(COURSES.map((c) => [c.id, c.likes]))
  );
  const [modal, setModal] = useState<(typeof COURSES)[0] | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postInput, setPostInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ai-campus-posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const addPost = () => {
    if (!postInput.trim()) return;
    const next = [
      { id: Date.now(), text: postInput.trim(), date: new Date().toLocaleDateString('ko-KR') },
      ...posts,
    ];
    setPosts(next);
    localStorage.setItem('ai-campus-posts', JSON.stringify(next));
    setPostInput('');
  };

  const toggleLike = (id: number) =>
    setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const filtered = COURSES.filter((c) =>
    c.title.includes(search) || c.desc.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 헤더 */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-700 font-bold text-sm">AI</span>
          </div>
          <h1 className="text-xl font-bold tracking-wide">AI 캠퍼스</h1>
        </div>
        <nav className="max-w-5xl mx-auto px-4 flex gap-1 pb-0">
          {(['홈', '강의', '게시판'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-semibold rounded-t-md transition-colors ${
                activeTab === tab
                  ? 'bg-white text-blue-700'
                  : 'text-blue-100 hover:bg-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 홈 탭 */}
        {activeTab === '홈' && (
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">AI 캠퍼스에 오신 것을 환영합니다!</h2>
            <p className="text-gray-500 text-lg mb-8">AI를 배우고, 업무에 바로 써먹는 실전 강의 플랫폼입니다.</p>
            <button
              onClick={() => setActiveTab('강의')}
              className="bg-blue-700 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-blue-800 transition-colors shadow"
            >
              강의 보러가기 →
            </button>
          </div>
        )}

        {/* 강의 탭 */}
        {activeTab === '강의' && (
          <div>
            <div className="flex items-center justify-between mb-6 gap-4">
              <input
                type="text"
                placeholder="강의 제목을 검색하세요..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  ⊞ 그리드
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  ☰ 리스트
                </button>
              </div>
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-12">검색 결과가 없습니다.</p>
            )}

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div
                      className="bg-gray-200 h-36 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => setModal(course)}
                    >
                      <span className="text-4xl">▶</span>
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-bold text-gray-800 mb-1 cursor-pointer hover:text-blue-700"
                        onClick={() => setModal(course)}
                      >
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{course.desc}</p>
                      <button
                        onClick={() => toggleLike(course.id)}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <span>♥</span>
                        <span>{likes[course.id]}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="flex flex-col gap-3">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 p-4"
                  >
                    <div
                      className="bg-gray-200 w-16 h-16 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100 flex-shrink-0"
                      onClick={() => setModal(course)}
                    >
                      <span className="text-2xl">▶</span>
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-bold text-gray-800 cursor-pointer hover:text-blue-700"
                        onClick={() => setModal(course)}
                      >
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">{course.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleLike(course.id)}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <span>♥</span>
                      <span>{likes[course.id]}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 게시판 탭 */}
        {activeTab === '게시판' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5">자유 게시판</h2>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="글을 입력하세요..."
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPost()}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={addPost}
                className="bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                등록
              </button>
            </div>
            {posts.length === 0 ? (
              <p className="text-center text-gray-400 py-12">아직 글이 없습니다. 첫 글을 남겨보세요!</p>
            ) : (
              <div className="flex flex-col gap-3">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-start">
                    <p className="text-gray-800 text-sm">{post.text}</p>
                    <span className="text-xs text-gray-400 ml-4 flex-shrink-0">{post.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 유튜브 모달 */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-bold text-gray-800 text-lg">{modal.title}</h3>
              <button
                onClick={() => setModal(null)}
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={modal.youtube}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="px-5 py-3 text-sm text-gray-500">{modal.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}
