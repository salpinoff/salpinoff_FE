type Props = {
  children: React.ReactNode;
  className?: string;
};

function LoginLayout({ children, className }: Props) {
  return (
    <html lang="ko">
      <body className={className}>{children}</body>
    </html>
  );
}

export default LoginLayout;
